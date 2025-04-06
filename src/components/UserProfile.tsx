import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GitHubUser } from "@/services/githubService";
import { User, MapPin, Link as LinkIcon, Github } from "lucide-react";


interface UserProfileProps {
    user: GitHubUser;
}

const UserProfile = ({ user }: UserProfileProps) => {
    return (
        <Card className="shadow-md">
            <CardHeader className="flex flex-row gap-4 pb-2">
                <img
                    src={user.avatar_url}
                    alt={`${user.login}'s avatar`}
                    className="h-20 w-20 rounded-full border-2 border-muted"
                />
                <div className="flex flex-col">
                    <h2 className="text-2xl font-bold">{user.name || user.login}</h2>
                    <a
                        href={user.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-muted-foreground hover:text-primary hover:underline"
                    >
                        <Github className="h-4 w-4" />
                        {user.login}
                    </a>
                </div>
            </CardHeader>
            <CardContent>
                {user.bio && <p className="mb-4 text-muted-foreground">{user.bio}</p>}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>
                            <strong>{user.followers}</strong> followers · <strong>{user.following}</strong> following
                        </span>
                    </div>

                    {user.location && (
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{user.location}</span>
                        </div>
                    )}

                    {user.blog && (
                        <div className="flex items-center gap-2">
                            <LinkIcon className="h-4 w-4 text-muted-foreground" />
                            <a
                                href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary hover:underline"
                            >
                                {user.blog}
                            </a>
                        </div>
                    )}


                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-md bg-muted p-2">
                        <div className="text-2xl font-bold">{user.public_repos}</div>
                        <div className="text-xs text-muted-foreground">Repositories</div>
                    </div>
                    <div className="rounded-md bg-muted p-2">
                        <div className="text-2xl font-bold">{user.public_gists}</div>
                        <div className="text-xs text-muted-foreground">Gists</div>
                    </div>
                    <div className="rounded-md bg-muted p-2">
                        <div className="text-2xl font-bold">{user.followers}</div>
                        <div className="text-xs text-muted-foreground">Followers</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default UserProfile;