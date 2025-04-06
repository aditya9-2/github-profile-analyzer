import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import LoadingSpinner from "@/components/LoadingSpinner";
import UserProfile from "@/components/UserProfile";
import RepoList from "@/components/RepoList";
import CommitActivityChart from "@/components/CommitActivityChart";
import { Github, Search } from "lucide-react";
import { useGithubStore } from "@/store/githubStore";

const Index = () => {
    const [username, setUsername] = useState("");

    // Get data and actions from Zustand store
    const {
        user,
        repos,
        commits,
        loading,
        error,
        searchedUsername,
        searchUser,
    } = useGithubStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username.trim()) {
            toast.error("Please enter a GitHub username");
            return;
        }

        searchUser(username.trim());
    };

    const isError = Boolean(error);
    const isLoading = loading;

    return (
        <div className="min-h-screen bg-background">
            <header className="bg-github-dark text-white">
                <div className="container flex items-center justify-between py-6">
                    <div className="flex items-center gap-2">
                        <Github className="h-8 w-8" />
                        <h1 className="text-2xl font-bold">GitHub Profile Analyzer</h1>
                    </div>
                    <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2">
                        <Input
                            type="text"
                            placeholder="Enter GitHub username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-400"
                        />
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <LoadingSpinner size="sm" />
                            ) : (
                                <>
                                    <Search className="mr-2 h-4 w-4" />
                                    Search
                                </>
                            )}
                        </Button>
                    </form>
                </div>
            </header>

            <main className="container py-8">
                {isError && (
                    <div className="rounded-lg border border-destructive p-6 text-center">
                        <h2 className="text-xl font-bold text-destructive">Error</h2>
                        <p className="mt-2 text-muted-foreground">
                            {error || "Failed to fetch GitHub data. Please try again."}
                        </p>
                        <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => searchUser(searchedUsername)}
                        >
                            Try Again
                        </Button>
                    </div>
                )}

                {!isError && searchedUsername && (
                    <div className="space-y-8">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-12">
                                <LoadingSpinner size="lg" className="mb-4" />
                                <p className="text-lg text-muted-foreground">
                                    Loading data for {searchedUsername}...
                                </p>
                            </div>
                        ) : (
                            <>
                                {user && (
                                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                                        <div className="lg:col-span-1">
                                            <UserProfile user={user} />
                                        </div>
                                        <div className="lg:col-span-2">
                                            <CommitActivityChart data={commits || []} />
                                        </div>
                                    </div>
                                )}

                                {repos && <RepoList repos={repos} />}
                            </>
                        )}
                    </div>
                )}

                {!searchedUsername && !isLoading && !isError && (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <Github className="mb-4 h-16 w-16 text-muted-foreground" />
                        <h2 className="mb-2 text-2xl font-bold">GitHub Profile Analyzer</h2>
                        <p className="mb-6 max-w-md text-muted-foreground">
                            Enter a GitHub username to view their repositories and activity metrics.
                        </p>
                        <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2">
                            <Input
                                type="text"
                                placeholder="e.g. facebook"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="text-center"
                            />
                            <Button type="submit">
                                <Search className="mr-2 h-4 w-4" />
                                Search
                            </Button>
                        </form>
                    </div>
                )}
            </main>

            <footer className="border-t bg-muted/30 py-6">
                <div className="container text-center text-sm text-muted-foreground">
                    <p>
                        GitHub Profile Analyzer - Data provided by the{" "}
                        <a
                            href="https://docs.github.com/en/rest"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-primary hover:underline"
                        >
                            GitHub API
                        </a>
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Index;
