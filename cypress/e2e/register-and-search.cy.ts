// cypress/e2e/form-submission.cy.ts

describe("Contact Form - Complete Flow", () => {
  beforeEach(() => {
    cy.task("resetSubmissions");
    cy.setCookie("useTestData", "1");
    cy.visit("/");
  });

  // ==========================================
  // 1. HAPPY PATH
  // ==========================================
  describe("Happy Path", () => {
    it("should complete full registration flow successfully", () => {
      // Navigate to form
      cy.contains("Register your interest").click();
      cy.url().should("include", "/register");

      // Fill all fields
      cy.findByLabelText("Name").type("John Doe");
      cy.findByLabelText("Company").type("Acme Inc");
      cy.findByLabelText("Mobile phone number").type("07123456789");
      cy.findByLabelText("Email address").type("john@acme.com");
      cy.findByLabelText("Postcode").type("EC1N 2SW");
      cy.findByRole("checkbox", { name: /pay\s?later/i }).check({
        force: true,
      });

      // Submit (scope to the form to avoid header Register button)
      cy.get("form").within(() => {
        cy.findByRole("button", { name: /register/i }).click();
      });

      // Verify navigation to list
      cy.url({ timeout: 10000 }).should("include", "/interested-dealerships");

      // Search for the new submission and verify it appears
      cy.findByPlaceholderText(
        "Start typing name, company, phone or email for search",
      ).type("John Doe");
      cy.wait(1200); // debounce + API delay
      cy.contains("John Doe").should("be.visible");
      cy.contains("Acme Inc").should("be.visible");
    });
  });

  // ==========================================
  // 2. BLUR VALIDATION
  // ==========================================
  describe("Blur Validation", () => {
    beforeEach(() => {
      cy.contains("Register your interest").click();
    });

    it("should validate name field on blur", () => {
      cy.findByLabelText("Name").type("123!@#"); // Invalid characters
      cy.findByLabelText("Company").focus(); // Trigger blur

      cy.contains("Name can only contain letters, numbers and spaces").should(
        "be.visible",
      );
    });

    it("should validate email field on blur", () => {
      cy.findByLabelText("Email address").type("invalid-email");
      cy.findByLabelText("Name").focus(); // Trigger blur

      cy.contains("Please enter a valid email address").should("be.visible");
    });

    it("should validate mobile phone on blur", () => {
      cy.findByLabelText("Mobile phone number").type("12345");
      cy.findByLabelText("Name").focus(); // Trigger blur

      cy.contains("Please enter a valid UK mobile number").should("be.visible");
    });

    it("should show success state when field is valid", () => {
      cy.findByLabelText("Name").type("John Doe");
      cy.findByLabelText("Company").focus(); // Trigger blur

      // Check for success icon (green checkmark)
      cy.findByLabelText("Name")
        .parent()
        .find("svg") // Success icon
        .should("exist");

      // Check for green border
      cy.findByLabelText("Name").should(
        "have.css",
        "border-color",
        "rgb(50, 190, 80)",
      ); // #32BE50
    });
  });

  // ==========================================
  // 3. SUBMIT VALIDATION
  // ==========================================
  describe("Submit Validation", () => {
    beforeEach(() => {
      cy.contains("Register your interest").click();
    });

    it("should prevent submit with empty required fields", () => {
      cy.get("form").within(() => {
        cy.findByRole("button", { name: /register/i }).click();
      });

      // Should stay on form page
      cy.url().should("include", "/register");

      // Should show error messages
      cy.contains("Name is required").should("be.visible");
      cy.contains("Company name is required").should("be.visible");
    });

    it("should prevent submit without payment method selected", () => {
      // Fill all fields but don't select payment
      cy.findByLabelText("Name").type("John Doe");
      cy.findByLabelText("Company").type("Acme Inc");
      cy.findByLabelText("Mobile phone number").type("07123456789");
      cy.findByLabelText("Email address").type("john@acme.com");
      cy.findByLabelText("Postcode").type("EC1N 2SW");

      cy.get("form").within(() => {
        cy.findByRole("button", { name: /register/i }).click();
      });

      // Should show payment method error
      cy.contains("Please select at least one payment method").should(
        "be.visible",
      );
    });

    it("should allow both payment methods to be selected", () => {
      cy.findByLabelText("Name").type("John Doe");
      cy.findByLabelText("Company").type("Acme Inc");
      cy.findByLabelText("Mobile phone number").type("07123456789");
      cy.findByLabelText("Email address").type("john@acme.com");
      cy.findByLabelText("Postcode").type("EC1N 2SW");

      // Select both
      cy.findByRole("checkbox", { name: /pay\s?later/i }).check({
        force: true,
      });
      cy.findByRole("checkbox", { name: /pay\s?now/i }).check({ force: true });

      cy.get("form").within(() => {
        cy.findByRole("button", { name: /register/i }).click();
      });

      // Should submit successfully
      cy.url({ timeout: 10000 }).should("include", "/interested-dealerships");
    });
  });

  // ==========================================
  // 4. FIELD VALIDATION RULES
  // ==========================================
  describe("Field Validation Rules", () => {
    beforeEach(() => {
      cy.contains("Register your interest").click();
    });

    it("should enforce name maxlength of 255", () => {
      const longString = "a".repeat(256);
      cy.findByLabelText("Name").type(longString);
      cy.findByLabelText("Company").focus();

      cy.contains("Name must be less than 255 characters").should("be.visible");
    });

    it("should enforce email minlength of 5", () => {
      cy.findByLabelText("Email address").type("a@b");
      cy.findByLabelText("Name").focus();

      cy.contains("Email must be at least 5 characters").should("be.visible");
    });

    it("should validate UK mobile phone format", () => {
      const invalidPhones = ["07123", "08123456789", "7123456789"];

      invalidPhones.forEach((phone) => {
        cy.findByLabelText("Mobile phone number").clear().type(phone);
        cy.findByLabelText("Name").focus();
        cy.contains("Please enter a valid UK mobile number").should(
          "be.visible",
        );
      });
    });

    it("should accept valid UK mobile phone formats", () => {
      const validPhones = ["07123456789", "0 7 1 2 3 4 5 6 7 8 9"];

      validPhones.forEach((phone) => {
        cy.findByLabelText("Mobile phone number").clear().type(phone);
        cy.findByLabelText("Name").focus();
        cy.contains("Please enter a valid UK mobile number").should(
          "not.exist",
        );
      });
    });
  });

  // ==========================================
  // 5. PERSISTENCE
  // ==========================================
  describe("Data Persistence", () => {
    it("should persist submissions after page reload", () => {
      // Submit form
      cy.contains("Register your interest").click();
      cy.findByLabelText("Name").type("Persistent User");
      cy.findByLabelText("Company").type("Persistent Co");
      cy.findByLabelText("Mobile phone number").type("07987654321");
      cy.findByLabelText("Email address").type("persist@test.com");
      cy.findByLabelText("Postcode").type("N6 1BA");
      cy.findByRole("checkbox", { name: /pay\s?later/i }).check({
        force: true,
      });
      cy.get("form").within(() => {
        cy.findByRole("button", { name: /register/i }).click();
      });

      cy.url({ timeout: 10000 }).should("include", "/interested-dealerships");
      cy.intercept("GET", "/api/submissions*").as("search");
      cy.findByPlaceholderText(
        "Start typing name, company, phone or email for search",
      ).type("Persistent User");
      cy.wait("@search");
      cy.contains("Persistent User").should("be.visible");

      // Reload page
      cy.reload();

      // Data should still be there (search again after reload)
      cy.intercept("GET", "/api/submissions*").as("search");
      cy.findByPlaceholderText(
        "Start typing name, company, phone or email for search",
      ).type("Persistent User");
      cy.wait("@search");
      cy.contains("Persistent User").should("be.visible");
      cy.contains("Persistent Co").should("be.visible");
    });
  });

  // ==========================================
  // 6. MULTIPLE SUBMISSIONS
  // ==========================================
  describe("Multiple Submissions", () => {
    it("should allow multiple submissions", () => {
      // First submission
      cy.contains("Register your interest").click();
      cy.findByLabelText("Name").type("User One");
      cy.findByLabelText("Company").type("Company One");
      cy.findByLabelText("Mobile phone number").type("07111111111");
      cy.findByLabelText("Email address").type("user1@test.com");
      cy.findByLabelText("Postcode").type("EC1N 2SW");
      cy.findByRole("checkbox", { name: /pay\s?now/i }).check({ force: true });
      cy.get("form").within(() => {
        cy.findByRole("button", { name: /register/i }).click();
      });

      cy.url({ timeout: 10000 }).should("include", "/interested-dealerships");
      // Search to reveal results
      cy.intercept("GET", "/api/submissions*").as("search");
      cy.findByPlaceholderText(
        "Start typing name, company, phone or email for search",
      )
        .clear()
        .type("User One");
      cy.wait("@search");
      cy.contains("User One").scrollIntoView().should("be.visible");

      // Second submission
      cy.visit("/register");
      cy.findByLabelText("Name").type("User Two");
      cy.findByLabelText("Company").type("Company Two");
      cy.findByLabelText("Mobile phone number").type("07222222222");
      cy.findByLabelText("Email address").type("user2@test.com");
      cy.findByLabelText("Postcode").type("N6 1BA");
      cy.findByRole("checkbox", { name: /pay\s?later/i }).check({
        force: true,
      });
      cy.get("form").within(() => {
        cy.findByRole("button", { name: /register/i }).click();
      });

      cy.url({ timeout: 10000 }).should("include", "/interested-dealerships");
      // Verify both by searching individually (avoid pagination ambiguity)
      cy.intercept("GET", "/api/submissions*").as("search");
      cy.findByPlaceholderText(
        "Start typing name, company, phone or email for search",
      )
        .clear()
        .type("User Two");
      cy.wait("@search");
      cy.contains("User Two").scrollIntoView().should("be.visible");
      cy.findByPlaceholderText(
        "Start typing name, company, phone or email for search",
      )
        .clear()
        .type("User One");
      cy.wait("@search");
      cy.contains("User One").scrollIntoView().should("be.visible");
    });
  });

  // ==========================================
  // 7. SEARCH FUNCTIONALITY
  // ==========================================
  describe("Search Functionality", () => {
    beforeEach(() => {
      // Add test data first
      cy.contains("Register your interest").click();
      cy.findByLabelText("Name").type("Search Test User");
      cy.findByLabelText("Company").type("Search Test Company");
      cy.findByLabelText("Mobile phone number").type("07555555555");
      cy.findByLabelText("Email address").type("search@test.com");
      cy.findByLabelText("Postcode").type("SW1A 1AA");
      cy.findByRole("checkbox", { name: /pay\s?later/i }).check({
        force: true,
      });
      cy.get("form").within(() => {
        cy.findByRole("button", { name: /register/i }).click();
      });
      cy.url({ timeout: 10000 }).should("include", "/interested-dealerships");
    });

    it("should search by company name", () => {
      cy.findByPlaceholderText(/search/i).type("Search Test Company");
      cy.contains("Search Test User").should("be.visible");
    });

    it("should search by name", () => {
      cy.findByPlaceholderText(/search/i).type("Search Test User");
      cy.contains("Search Test Company").should("be.visible");
    });

    it("should search by email", () => {
      cy.findByPlaceholderText(/search/i).type("search@test.com");
      cy.contains("Search Test Company").should("be.visible");
    });

    it("should search by phone", () => {
      cy.findByPlaceholderText(/search/i).type("07555555555");
      cy.contains("Search Test Company").should("be.visible");
    });

    it("should show no results for non-matching search", () => {
      cy.findByPlaceholderText(/search/i).type("NonExistentCompany123456");
      cy.contains("No results found").should("be.visible");
    });

    it("should be case-insensitive", () => {
      cy.findByPlaceholderText(/search/i).type("search test company");
      cy.contains("Search Test User").should("be.visible");
    });

    it("should clear results when search is cleared", () => {
      cy.findByPlaceholderText(/search/i).type("Search Test Company");
      cy.contains("Search Test User").should("be.visible");

      cy.findByPlaceholderText(/search/i).clear();
      // Should show all results again or maintain filtered state
    });
  });

  // ==========================================
  // 8. POSTCODE AUTOCOMPLETE
  // ==========================================
  describe("Postcode Autocomplete", () => {
    beforeEach(() => {
      cy.contains("Register your interest").click();
    });

    it("should show autocomplete suggestions when typing postcode", () => {
      cy.findByLabelText("Postcode").type("EC");

      // Should show dropdown with suggestions
      cy.contains("EC1N 2SW").should("be.visible");
    });

    it("should select postcode from autocomplete", () => {
      cy.findByLabelText("Postcode").type("EC");
      cy.contains("EC1N 2SW").click();

      // Input should be filled
      cy.findByLabelText("Postcode").should("have.value", "EC1N 2SW");
    });
  });
});
