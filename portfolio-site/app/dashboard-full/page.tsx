export default function FullDashboardPage() {
  return (
    <div className="w-screen h-screen m-0 p-0">
      <iframe
        src="/risk-dashboard.html"
        className="w-full h-full block border-0"
        title="Risk Management Dashboard"
      />
    </div>
  );
}