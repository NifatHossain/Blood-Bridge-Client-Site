import { Link } from "react-router-dom";


const ContentManage = () => {
    return (
        <div>
            <h2>Content manage</h2>
            <Link to={'/dashboard/contentsmanagement/addcontent'}><button className="btn">add content</button></Link>
        </div>
    );
};

export default ContentManage;