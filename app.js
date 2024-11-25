new Vue({
    el: "#app",
    data: {
      newTask: {
        text: "",
        category: "",
        priority: "",
        dueDate: "",
        completed: false
      },
      tasks: JSON.parse(localStorage.getItem("tasks")) || [],
      filter: {
        category: "",
        priority: ""
      }
    },
    computed: {
      filteredTasks() {
        return this.tasks.filter(task => {
          const matchesCategory = this.filter.category ? task.category === this.filter.category : true;
          const matchesPriority = this.filter.priority ? task.priority === this.filter.priority : true;
          return matchesCategory && matchesPriority;
        });
      },
      completedTasks() {
        return this.tasks.filter(task => task.completed).length;
      },
      pendingTasks() {
        return this.tasks.filter(task => !task.completed).length;
      }
    },
    methods: {
      addTask() {
        if (this.newTask.text.trim() === "" || this.newTask.category === "" || this.newTask.priority === "") {
          Swal.fire({
            icon: "warning",
            title: "Por favor completa todos los campos",
            showConfirmButton: false,
            timer: 1500
          });
          return;
        }
  
        this.tasks.push({ ...this.newTask });
        this.saveTasks();
        this.resetNewTask();
  
        Swal.fire({
          icon: "success",
          title: "Tarea agregada correctamente",
          showConfirmButton: false,
          timer: 1500
        });
      },
      deleteTask(index) {
        this.tasks.splice(index, 1);
        this.saveTasks();
  
        Swal.fire({
          icon: "error",
          title: "Tarea eliminada",
          showConfirmButton: false,
          timer: 1500
        });
      },
      saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
      },
      resetNewTask() {
        this.newTask = { text: "", category: "", priority: "", dueDate: "", completed: false };
      }
    }
  });  