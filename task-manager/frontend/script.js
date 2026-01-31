/**
 * Frontend logic for Task Manager
 * Handles UI rendering and API communication
 */

const API_URL = "http://localhost:5000/api/tasks";

/**
 * Fetch all tasks from backend and render them
 */
async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();

        const list = document.getElementById("taskList");
        list.innerHTML = "";

        if (tasks.length === 0) {
            list.innerHTML = "<li>No tasks available</li>";
            return;
        }

        tasks.forEach(task => {
            const li = document.createElement("li");

            // Status color logic (small UX improvement)
            const statusColor =
                task.status === "Completed"
                    ? "green"
                    : task.status === "In Progress"
                        ? "orange"
                        : "gray";

            li.innerHTML = `
        <span>
          <strong>${task.title}</strong>
          <span style="color:${statusColor}; font-weight:600;">
            (${task.status})
          </span>
        </span>
        <button onclick="deleteTask('${task._id}')">❌</button>
      `;

            list.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
}

/**
 * Add a new task
 */
async function addTask() {
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const status = document.getElementById("status").value;

    // Basic validation
    if (!title) {
        alert("Title is required");
        return;
    }

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description, status })
        });

        // Clear input fields after successful add
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";

        fetchTasks();
    } catch (error) {
        console.error("Error adding task:", error);
    }
}

/**
 * Delete a task by ID
 */
async function deleteTask(id) {
    try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        fetchTasks();
    } catch (error) {
        console.error("Error deleting task:", error);
    }
}

// Initial load
fetchTasks();

