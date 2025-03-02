let assignedTaskCount = 6;
let completedTaskCount = 23;
let activityLogs = [];
const backgroundColors = [
  "#3752FD33",
  "#FD375233",
  "#52FD3733",
  "#FD37C833",
  "#FDDA3733",
  "#37FDD833",
];
let currentColorIndex = 0;

// Function to change body background color
function changeBodyBackgroundColor() {
  currentColorIndex = (currentColorIndex + 1) % backgroundColors.length;
  document.body.style.backgroundColor = backgroundColors[currentColorIndex];
}

function updateDateDisplay() {
  const dateElement = document.getElementById("date");
  if (dateElement) {
    const currentDate = new Date();

    const dayOfWeek = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
    }).format(currentDate);

    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      currentDate
    );
    const dayOfMonth = currentDate.getDate();

    const year = currentDate.getFullYear();

    const formattedDate = `${dayOfWeek} , <br /> ${month} ${dayOfMonth} ${year}`;

    dateElement.innerHTML = formattedDate;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  updateTaskAssignedCount(assignedTaskCount);
  updateCompletedTaskCount(completedTaskCount);

  createActivityLogContainer();
  updateDateDisplay();

  const themeButton = document.getElementById("change-bg-color");
  if (themeButton) {
    themeButton.addEventListener("click", changeBodyBackgroundColor);
  }

  const completedButtons = document.querySelectorAll("button");
  completedButtons.forEach((button) => {
    if (button.textContent.trim() === "completed") {
      button.addEventListener("click", handleTaskCompletion);
    }
  });

  const clearHistoryButton = document.getElementById("clear-history-btn");

  clearHistoryButton.addEventListener("click", clearActivityHistory);

  const discoverCard = document.getElementById("discover-card");
  if (discoverCard) {
    discoverCard.style.cursor = "pointer";
    discoverCard.addEventListener("click", navigateToBlog);
  }
});

// Create activity log container
function createActivityLogContainer() {
  const activitySection = document.querySelector(".bg-\\[\\#FFFFFF\\]");

  // Check if container already exists
  let container = document.getElementById("activity-log-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "activity-log-container";
    container.className = "mt-4 space-y-2 p-4";

    if (activitySection) {
      activitySection.appendChild(container);
    }
  }

  // Update with any existing logs
  renderActivityLogs();
}

// Handle task completion
function handleTaskCompletion(event) {
  const cardElement = event.target.closest(".bg-\\[\\#3752FD33\\]");
  if (!cardElement) return;

  const projectElement = cardElement.querySelector("button.bg-\\[\\#FFFFFF\\]");
  const titleElement = cardElement.querySelector("h1.mt-4.font-medium");

  const projectName = projectElement
    ? projectElement.textContent.trim()
    : "Unknown Project";
  const taskTitle =
    titleElement && titleElement.textContent.trim()
      ? titleElement.textContent.trim()
      : "Untitled Task";

  window.alert("Board updated Successfully");

  if (assignedTaskCount === 1) {
    window.alert("Congrats!!! You have completed all the current tasks");
  }

  assignedTaskCount--;
  updateTaskAssignedCount(assignedTaskCount);

  completedTaskCount++;
  updateCompletedTaskCount(completedTaskCount);

  const currentTime = new Date();
  const timeString = currentTime.toLocaleTimeString();
  addActivityLog(`You have completed the task ${taskTitle} at ${timeString}`);

  event.target.disabled = true;
  event.target.style.backgroundColor = "#6B7280";
}

// Update task assigned count display
function updateTaskAssignedCount(count) {
  const taskAssignedElement = document.querySelector(
    ".items-center p.font-bold"
  );
  if (taskAssignedElement) {
    taskAssignedElement.textContent = String(count).padStart(2, "0");
  }
}

// Update completed task count display
function updateCompletedTaskCount(count) {
  const completedCountElement = document.querySelector("h2.font-bold");
  if (completedCountElement) {
    completedCountElement.textContent = count;
  }
}

// Add entry to activity log array and render
function addActivityLog(message) {
  activityLogs.push(message);
  renderActivityLogs();
}

// Render all activity logs from the array
function renderActivityLogs() {
  const container = document.getElementById("activity-log-container");
  if (!container) return;

  container.innerHTML = "";

  // Render each log entry
  activityLogs.forEach((log) => {
    const entryElement = document.createElement("div");
    entryElement.className = "bg-gray-100 p-2 rounded text-sm mb-2";
    entryElement.textContent = log;
    container.appendChild(entryElement);
  });

  // If no logs, show a message
  if (activityLogs.length === 0) {
    const emptyMessage = document.createElement("div");
    emptyMessage.className = "text-gray-400 text-sm";
    container.appendChild(emptyMessage);
  }
}

// Clear all activity history
function clearActivityHistory() {
  console.log("logging the history");

  activityLogs = [];
  renderActivityLogs();
}

// Navigate to blog page
function navigateToBlog() {
  window.location.href = "blog.html";
}
