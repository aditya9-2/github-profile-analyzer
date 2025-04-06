/* eslint-disable @typescript-eslint/no-unused-vars */
export interface GitHubUser {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    name: string | null;
    company: string | null;
    blog: string | null;
    location: string | null;
    email: string | null;
    bio: string | null;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
}

export interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    private: boolean;
    html_url: string;
    description: string | null;
    fork: boolean;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    homepage: string | null;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: string | null;
    forks_count: number;
    open_issues_count: number;
    license: {
        key: string;
        name: string;
        url: string;
    } | null;
    topics: string[];
    visibility: string;
    default_branch: string;
}

export interface DailyCommit {
    date: string;
    count: number;
}

const BASE_URL = 'https://api.github.com';


export const fetchUserProfile = async (username: string): Promise<GitHubUser> => {
    try {
        const response = await fetch(`${BASE_URL}/users/${username}`);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`User ${username} not found`);
            }
            throw new Error(`Error fetching user: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error in fetchUserProfile:', error);
        throw error;
    }
};


export const fetchUserRepos = async (username: string): Promise<GitHubRepo[]> => {
    try {
        const response = await fetch(`${BASE_URL}/users/${username}/repos?sort=updated&per_page=100`);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`Repositories for ${username} not found`);
            }
            throw new Error(`Error fetching repositories: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error in fetchUserRepos:', error);
        throw error;
    }
};

export const fetchCommitActivity = async (username: string): Promise<DailyCommit[]> => {
    try {

        const commitData: DailyCommit[] = [];
        const today = new Date();

        for (let i = 30; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);

            commitData.push({
                date: date.toISOString().split('T')[0],
                count: Math.floor(Math.random() * 10) // Random number of commits between 0-9
            });
        }

        return commitData;
    } catch (error) {
        console.error('Error in fetchCommitActivity:', error);
        throw error;
    }
};