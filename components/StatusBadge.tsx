const statusStyles: Record<string, string> = {
  ongoing: "bg-green-100 text-green-700",
  completed: "bg-blue-100 text-blue-700",
  hiatus: "bg-amber-100 text-amber-700",
  cancelled: "bg-red-100 text-red-700",
};

const statusLabels: Record<string, string> = {
  ongoing: "連載中",
  completed: "完結",
  hiatus: "休載中",
  cancelled: "打ち切り",
};

type Props = {
  status: string;
};

export default function StatusBadge({ status }: Props) {
  const style = statusStyles[status] ?? "bg-gray-100 text-gray-700";
  const label = statusLabels[status] ?? status;

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${style}`}
    >
      {label}
    </span>
  );
}
