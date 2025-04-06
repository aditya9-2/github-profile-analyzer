import { create } from "zustand";
import {
    DailyCommit,
    fetchCommitActivity,
    fetchUserProfile,
    fetchUserRepos,
    GitHubRepo,
    GitHubUser
} from "@/services/githubService";

interface GithubState {
    user: GitHubUser | null;
    repos: GitHubRepo[] | null;
    commits: DailyCommit[] | null;
    loading: boolean;
    error: string | null;
    searchedUsername: string;
    searchUser: (username: string) => Promise<void>;
}

export const useGithubStore = create<GithubState>((set) => ({
    user: null,
    repos: null,
    commits: null,
    loading: false,
    error: null,
    searchedUsername: "",

    searchUser: async (username: string) => {
        if (!username.trim()) return;
        set({ loading: true, error: null, searchedUsername: username });
        try {
            const [user, repos, commits] = await Promise.all([
                fetchUserProfile(username),
                fetchUserRepos(username),
                fetchCommitActivity(username),
            ]);
            set({ user, repos, commits, loading: false });
        } catch (err) {
            set({ error: (err as Error).message, loading: false });
        }
    },
}));
