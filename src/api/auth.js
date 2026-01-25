export async function registerUser(userData) {
	const res = await fetch("http://localhost:3000/api/auth/register", {
		method: "POST",
		body: JSON.stringify(userData),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!res.ok) throw new Error("Failed to register");

	const data = await res.json();
	return data;
}

export async function loginUser(userData) {
	const res = await fetch("http://localhost:3000/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userData),
	});

    if (!res.ok) throw new Error("Failed to login");

	const data = await res.json();
    return data;
}
