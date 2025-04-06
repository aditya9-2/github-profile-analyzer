
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DailyCommit } from "@/services/githubService";
import { Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface CommitActivityChartProps {
    data: DailyCommit[];
}

const CommitActivityChart = ({ data }: CommitActivityChartProps) => {
    // Format the data for the chart
    const chartData = data.map((item) => ({
        date: item.date.split('-').slice(1).join('/'), // Format as MM/DD
        commits: item.count,
    }));

    return (
        <Card className="shadow-md">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Daily Commit Activity
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis
                                dataKey="date"
                                tick={{ fontSize: 12 }}
                                tickMargin={10}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fontSize: 12 }}
                                tickMargin={10}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "hsl(var(--background))",
                                    border: "1px solid hsl(var(--border))",
                                    borderRadius: "var(--radius)",
                                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                                }}
                                labelStyle={{ fontWeight: "bold", marginBottom: "5px" }}
                            />
                            <Bar
                                dataKey="commits"
                                name="Commits"
                                fill="hsl(var(--primary))"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default CommitActivityChart;