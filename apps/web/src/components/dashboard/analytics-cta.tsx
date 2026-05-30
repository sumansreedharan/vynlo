import { Card, CardContent } from "../ui/card";
export default function AnalyticsCTA() {
  return (
    <Card hoverEffect={false} className="mt-6">
      <CardContent className="p-6 text-center text-sm text-zinc-500">
        Ready to review comprehensive pipeline insights?
        <a
          href="#"
          className="ml-1 font-medium text-zinc-300 hover:text-white transition underline underline-offset-4"
        >
          View Analytics Report →
        </a>
      </CardContent>
    </Card>
  );
}
