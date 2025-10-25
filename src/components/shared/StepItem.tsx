type Props = {
  index: number;
  title: string;
  description: string;
};

export default function StepItem({ index, title, description }: Props) {
  return (
    <div className="flex items-start gap-3">
      <div>
        <div
          aria-hidden
          className="h-6 w-6 flex items-center justify-center rounded-full border border-text bg-[var(--color-accent)] text-text text-[14px] leading-6 font-extrabold"
        >
          {index}
        </div>
      </div>

      <div className="font-inter text-text text-[16px] leading-6">
        <div className="font-extrabold">{title}</div>
        <p className="font-normal">{description}</p>
      </div>
    </div>
  );
}
