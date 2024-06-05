import Gantt from "frappe-gantt";

export default class GanttComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        gantt: null,
        };
    }
    
    componentDidMount() {
        const gantt = new Gantt("#gantt", this.props.tasks, {
        custom_popup_html: function (task) {
            return `
            <div class="details-container">
                <h5>${task.name}</h5>
                <p>${task.start} - ${task.end}</p>
                <p>${task.progress}%</p>
            </div>
            `;
        },
        });
        this.setState({ gantt });
    }
    
    render() {
        return <div id="gantt" />;
    }
    }