let appStateTasks = [];

const pushBtn = document.getElementById('studioTaskCommitTrigger');
const valueField = document.getElementById('studioTaskInputField');
const parentContainer = document.getElementById('studioTasksDisplayArea');

pushBtn.addEventListener('click', parseTaskEntry);
valueField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') parseTaskEntry();
});

function parseTaskEntry() {
    const refinedString = valueField.value.trim();

    if (refinedString === "") {
        alert("Operation blocked: Inbound field configuration null.");
        return;
    }

    const dataModel = {
        taskId: Date.now(),
        taskLabelText: refinedString,
        checkedDone: false
    };

    appStateTasks.push(dataModel);
    valueField.value = "";
    rebuildGraphicView();
}

function processToggle(id) {
    appStateTasks = appStateTasks.map(task => {
        if (task.taskId === id) {
            return { ...task, checkedDone: !task.checkedDone };
        }
        return task;
    });
    rebuildGraphicView();
}

function processDelete(id) {
    appStateTasks = appStateTasks.filter(task => task.taskId !== id);
    rebuildGraphicView();
}

function rebuildGraphicView() {
    parentContainer.innerHTML = "";

    appStateTasks.forEach(task => {
        const itemLi = document.createElement('li');
        itemLi.className = `graphic-row-task ${task.checkedDone ? 'task-done' : ''}`;

        const descSpan = document.createElement('span');
        descSpan.textContent = task.taskLabelText;
        itemLi.appendChild(descSpan);

        const actionsDiv = document.createElement('div');

        const stateBtn = document.createElement('button');
        stateBtn.className = 'graphic-util-btn opt-check';
        stateBtn.textContent = task.checkedDone ? 'Reopen' : 'Complete';
        stateBtn.addEventListener('click', () => processToggle(task.taskId));
        actionsDiv.appendChild(stateBtn);

        const trashBtn = document.createElement('button');
        trashBtn.className = 'graphic-util-btn opt-trash';
        trashBtn.textContent = 'Remove';
        trashBtn.addEventListener('click', () => processDelete(task.taskId));
        actionsDiv.appendChild(trashBtn);

        itemLi.appendChild(actionsDiv);
        parentContainer.appendChild(itemLi);
    });
}