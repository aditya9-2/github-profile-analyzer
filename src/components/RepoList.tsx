import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitHubRepo } from "@/services/githubService";
import { Badge } from "@/components/ui/badge";
import {
    Star, GitFork, Code, ArrowUp, Calendar
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface RepoListProps {
    repos: GitHubRepo[];
}

const RepoList = ({ repos }: RepoListProps) => {
    // Sort repos by stars (most to least)
    const sortedRepos = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count);

    return (
        <Card className="shadow-md">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Repositories ({repos.length})
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {sortedRepos.map((repo) => (
                        <div
                            key={repo.id}
                            className="rounded-lg border p-4 transition-all hover:bg-muted/50"
                        >
                            <div className="flex flex-col gap-2">
                                <div className="flex items-start justify-between">
                                    <a
                                        href={repo.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-lg font-medium text-primary hover:underline"
                                    >
                                        {repo.name}
                                    </a>
                                    <div className="flex items-center gap-3">
                                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                                            <Star className="h-4 w-4" />
                                            {repo.stargazers_count}
                                        </span>
                                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                                            <GitFork className="h-4 w-4" />
                                            {repo.forks_count}
                                        </span>
                                    </div>
                                </div>

                                {repo.description && (
                                    <p className="text-sm text-muted-foreground">{repo.description}</p>
                                )}

                                <div className="flex flex-wrap gap-2">
                                    {repo.language && (
                                        <Badge variant="outline" className="bg-muted/80">
                                            {repo.language}
                                        </Badge>
                                    )}

                                    {repo.topics && repo.topics.slice(0, 3).map((topic) => (
                                        <Badge key={topic} variant="secondary">
                                            {topic}
                                        </Badge>
                                    ))}

                                    {repo.topics && repo.topics.length > 3 && (
                                        <Badge variant="outline">+{repo.topics.length - 3}</Badge>
                                    )}
                                </div>

                                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <ArrowUp className="h-3.5 w-3.5" />
                                        Last pushed {formatDistanceToNow(new Date(repo.pushed_at), { addSuffix: true })}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-3.5 w-3.5" />
                                        Created {formatDistanceToNow(new Date(repo.created_at), { addSuffix: true })}
                                    </span>
                                    {repo.license && (
                                        <span className="flex items-center gap-1">
                                            License: {repo.license.name}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {repos.length === 0 && (
                        <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
                            No repositories found.
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default RepoList;