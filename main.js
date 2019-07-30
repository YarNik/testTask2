// Your web app's Firebase configuration
  let firebaseConfig = {
    apiKey: "AIzaSyC-eKupxVhgA4L3DOFQyA4A6gPDtlNfCbk",
    authDomain: "friendlychat-1fbc0.firebaseapp.com",
    databaseURL: "https://friendlychat-1fbc0.firebaseio.com",
    projectId: "friendlychat-1fbc0",
    storageBucket: "",
    messagingSenderId: "765352473875",
    appId: "1:765352473875:web:6ddbdf57a47ba03a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


let data = [
	{ key: 1, projectName: "Complete the task for Ruby", done: false, text: "Open this file" },
	{key: 2, projectName: "Complete the task for Ruby", done: false, text: "Write HTML & CSS" },
	{key: 3, projectName: "Complete the task for Ruby", done: false, text: "Solve this task" },
	{key: 4, projectName: "For Home", done: false, text: "Call mam" }
]


class Heading extends React.Component{
	
	render() {
		return (	
			<div className="list_heading">
				<i className="fa fa-tasks"></i>
				<span className="name_list_heading">{this.props.projectName}</span>
				<i className="far fa-edit"></i>
				<i className="fas fa-trash-alt"></i>
			</div>
		);
	}
}


class TaskInput extends React.Component{
	render() {
		return (
			<div className="task_adding">
				<i className="fas fa-plus"></i>
				<input type="text" 
					placeholder="Start typing here to create a task..."
					className="editor_task_name"
					size= "45"
				/>
				<button className="task_adding_button">Add Task</button>
			</div>
		);
	}
}


class OneTasks extends React.Component{
	render() {
		return (
			<tr>
				<td className="td_checkbox">
					<input type="checkbox"
						className="checkbox_task"
					/>
				</td>
				<td className="td_text">
				{this.props.info.text}</td>
				<td className="td_buttons_group">
					<i className="fas fa-arrow-up"></i>
					<i className="fas fa-arrow-down"></i>
					<i className="fas fa-pen"></i>
					<i className="fas fa-trash-alt"></i>
				</td>
			</tr>
		);
	}
}


class TasksList extends React.Component{
	render() {
		return (
			<div className="task_table">
				<table className="table table-bordered">
					<tbody>
						{data.filter(item => item.projectName ==this.props.projectName).map(item => <OneTasks key={item.key} info={item} />)}
					</tbody>
				</table>
			</div>
		);
	}
}


class ListsApptest extends React.Component{
	constructor(props){
		super(props);
		this.state = {
		data: []
		};
	}
	
	componentDidMount() {
		firebase.database().ref('/').on('value', snapshot => {
			let allProjects = [];
			let test = snapshot.val();
				for (let props in test) {
					allProjects.push(test[props]);
				}
			console.log(allProjects);
			this.setState({
				data: allProjects
			});
		});
	}

	render() {
	  let Rec = this.state.data;
	  return( <div>
				<div>{ JSON.stringify(this.state.data, null, 2) }</div>
				{Rec.map(item => console.log(item, item.key))}         // ПОЧЕМУ item.key undefined ???
			</div>
	  );
	}
}

class ListsApp extends React.Component{
       render() {
        return (
          <div className="app">
            <h2 className="app__header">SIMPLE TODO LISTS</h2>
            <h3 className="app__header">FROM RUBY GARAGE</h3>
			
			<Heading projectName="Complete the task for Ruby" />
			<TaskInput />
			<TasksList projectName="Complete the task for Ruby" />
			
			<Heading projectName="For Home" />
			<TaskInput />
			<TasksList projectName="For Home" />
			
			<ListsApptest />
						
          </div> 
        );
    }
}



ReactDOM.render(
    <ListsApp />,
    document.getElementById('root')
);
