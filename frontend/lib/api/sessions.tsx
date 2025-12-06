// api.ts
const apiUrl = "http://127.0.0.1:8000/sessions";

export interface Session {
    session_id: string;
    user_id: string;
    start_time: string;
    end_time?: string; // Made optional as it might not exist yet
    status: 'active' | 'paused' | 'completed' | 'abandoned';
    actual_duration_seconds: number; // Fixed typo: acutal -> actual
    notes?: string;
}

export const sessionApi = {
    getActiveSession: async (userId: string): Promise<Session | null> => {
        // Ensure backend route matches: /sessions/active/{userId}
        const response = await fetch(`${apiUrl}/active/${userId}`);

        // Handle 200 OK with null body (no active session) gracefully
        if (response.status === 200) {
            const data = await response.json();
            return data; // This might be null if backend returns null
        }

        if (!response.ok) {
            throw new Error(`Failed to fetch active session for user ${userId}`);
        }
        return response.json();
    },

    startSession: async (userId: string, notes?: string): Promise<Session> => {
        const response = await fetch(`${apiUrl}/start`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: userId,
                notes: notes,
                intended_duration_minutes: 25 // Fixed typo: intented -> intended
            })
        })
        if (!response.ok) {
            throw new Error(`Failed to start session for user ${userId}`);
        }
        return response.json();
    },

    pauseSession: async (sessionId: string): Promise<{ status: string; session_id: string }> => {
        const response = await fetch(`${apiUrl}/${sessionId}/pause`, {
            method: 'POST',
        });
        if (!response.ok) {
            throw new Error('Failed to pause session');
        }
        return response.json();
    },

    resumeSession: async (sessionId: string): Promise<{ status: string; session_id: string }> => {
        const response = await fetch(`${apiUrl}/${sessionId}/resume`, {
            method: 'POST',
        });
        if (!response.ok) {
            throw new Error('Failed to resume session');
        }
        return response.json();
    },

    endSession: async (sessionId: string, notes?: string): Promise<{ status: string; session_id: string }> => {
        const response = await fetch(`${apiUrl}/${sessionId}/end`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ notes }),
        });
        if (!response.ok) {
            throw new Error('Failed to end session');
        }
        return response.json();
    },
};