import axios from "axios";

function GistDetails({details, loading}) {
    console.log("-------------------------------")
    if(loading) {
        return (
            <h1 className="loader">Loading...</h1>
        )
    }{
    
    let tags = []
    let forksCount = details.forks
    if(typeof(forksCount) === "undefined"){
         if(tags.length === 0)
        forksCount = "";
        else 
        forksCount = 0;
    }
        else
        forksCount = forksCount.length

    
    let keys = details.files
    let content = ""
    if (typeof(keys) === "undefined")
        keys = []
        else
        keys = Object.keys(keys)
    
    keys.forEach(element => {
        console.log(details.files[element].content)
        content = details.files[element].content
        tags.push(details.files[element].language+" ")
       
    });

    let forkers = details.forks
    let users = []
    if(typeof(forkers) === "undefined")
        forkers = "No one"
        else{
            
            forkers.forEach(element => {
                users.push(element.user.login+" ")
              
            });
        }
    let forkersName = users.slice(0,3)

    if(forkersName.length === 0)
        if(tags.length === 0)
        forkersName = ""
        else
        forkersName = "No one"
  
    return (
        <div className="repo-details-container">
            <div className="details-row">
                <label className="label">Id:</label>
                <span className="value">{details.id}</span>
            </div>
            <div className="details-row">
                <label className="label">Tags:</label>
                <span className="value">{tags}</span>
            </div>
            <div className="details-row">
                <label className="label">Forks count:</label>
                <span className="value">{forksCount}</span>
            </div>
            <div className="details-row">
                <label className="label">Last forkers:</label>
                <span className="value">{forkersName}</span>
            </div>
            <div className="details-row">
                <label className="label">Content:</label>
            </div>
            
            <pre >
                {content}
            </pre>
            
        </div>
    )
    }
}

export default GistDetails