type Complexity = {
  best?: string;
  average?: string;
  worst?: string;
  space?: string;
  access?: string;
  search?: string;
  insertion?: string;
  deletion?: string;
};

type ComplexityTableProps = {
  complexity: Complexity;
};

export function ComplexityTable({ complexity }: ComplexityTableProps) {
  const rows = Object.entries(complexity).filter(([, value]) => Boolean(value));

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-border bg-white/70">
      <table className="w-full border-collapse text-left">
        <tbody>
          {rows.map(([label, value]) => (
            <tr key={label} className="border-b border-border last:border-b-0">
              <th className="px-5 py-4 text-sm font-semibold capitalize text-foreground">{label}</th>
              <td className="px-5 py-4 font-mono text-sm text-muted">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
