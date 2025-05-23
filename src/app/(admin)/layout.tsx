"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("role");

        document.cookie = "isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        router.push("/login");
    };
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-100 p-4 border-r space-y-4">
                <h2 className="text-lg font-semibold">Dashboard</h2>
                <ul className="space-y-3 text-sm">
                    <li className="px-2 py-2 rounded hover:bg-gray-200 cursor-pointer">Pending Suppliers</li>
                    <li className="px-2 py-2 rounded hover:bg-gray-200 cursor-pointer">Pending Events</li>
                    <li className="px-2 py-2 rounded hover:bg-gray-200 cursor-pointer">Moderate Posts</li>
                    <li className="px-2 py-2 rounded hover:bg-gray-200 cursor-pointer">User Management</li>
                    <li
                        onClick={handleLogout}
                        className="px-2 py-2 rounded hover:bg-red-100 text-red-600 cursor-pointer font-medium"
                    >
                        Logout
                    </li>
                </ul>
            </aside>


            {/* Main content */}
            <main className="flex-1 p-6 space-y-6 overflow-auto">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4">
                    {["Submissions", "Total Users", "Active Posts", "Reported Content"].map((label, i) => (
                        <Card key={i} className="text-center py-4">
                            <CardContent>
                                <div className="text-2xl font-bold">{[8, 150, 24, 2][i]}</div>
                                <div className="text-muted-foreground text-sm">{label}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Pending Suppliers & Events */}
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <h2 className="font-semibold mb-2">Pending Suppliers</h2>
                        <div className="space-y-2">
                            {[1, 2].map((_, i) => (
                                <Card key={i} className="p-3 flex justify-between items-center">
                                    <div className="font-medium">Supplier Name</div>
                                    <Button size="sm">Approve</Button>
                                </Card>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="font-semibold mb-2">Pending Events</h2>
                        <div className="space-y-2">
                            {[1, 2].map((_, i) => (
                                <Card key={i} className="p-3 flex justify-between items-center">
                                    <div className="font-medium">Event Name</div>
                                    <div className="space-x-2">
                                        <Button size="sm">Approve</Button>
                                        {i === 1 && <Button size="sm" variant="destructive">Reject</Button>}
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Reported Posts */}
                <div>
                    <h2 className="font-semibold mb-2">Reported Posts</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((_, i) => (
                            <Card key={i} className="p-3 flex justify-between items-center">
                                <div>
                                    <div className="font-medium">Post Title</div>
                                    <div className="text-sm text-muted-foreground">Description or reason</div>
                                </div>
                                <Button size="sm">View</Button>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
