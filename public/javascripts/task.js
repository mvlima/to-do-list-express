const setTaskAsDone = async (e, element, id) => {
  e.preventDefault();

  try {
    const headers = new Headers({
      "Content-Type": "application/json",
    });

    const body = JSON.stringify({ task: { done: element.checked } });

    const response = await fetch(`/tasks/${id}?_method=put`, {
      headers,
      body,
      method: "PUT",
    });

    const data = await response.json();

    const { task } = data;
    const { done } = task;

    const parent = element.parentNode;

    element.checked = done;

    if (done) {
      parent.classList.add("has-text-success");
      parent.classList.add("is-italic");
    } else {
      parent.classList.remove("has-text-success");
      parent.classList.remove("is-italic");
    }
  } catch (error) {
    console.error("Error updating task: " + error.message);
  }
};
