//Blogging App using Hooks
import { db } from "./firebaseinit";
import { collection, addDoc, doc, setDoc, getDocs, onSnapshot, deleteDoc } from "firebase/firestore";
import { useState, useRef, useEffect, useReducer } from "react";
// function blogReducer(state, action) {
//     switch (action.type) {
//         case "ADD":
//             return [action.blog, ...state]
//         case "REMOVE":
//             return state.filter((blog, index) => index !== action.index);
//         default:
//             return [];
//     }
// }
export default function Blog() {
    const [title, setTitle] = useState("");//
    const [content, setContent] = useState("");// instead of these two state wcn write it const [formData,setFormData]=useState({title:"",content:""})
    const [blogs, setBlogs] = useState([]);// we use setReducer insted of this
    // const [blogs, dispatch] = useReducer(blogReducer, [])
    const titleRef = useRef(null);

    useEffect(() => {
        titleRef.current.focus();
    }, []);
    useEffect(() => {
        // async function fetchData() {
        //     const snapShot = await getDocs(collection(db, "blogs"))
        //     const blogs = snapShot.docs.map((doc) => {
        //         return {
        //             id: doc.id,
        //             ...doc.data()
        //         }
        //     })
        //     setBlogs(blogs)
        // }
        // fetchData();
        //we used  onSnapshot instead of the above code because it will keep listening to any changes in the database and update 

        const unsub = onSnapshot(collection(db, "blogs"), (snapShot) => {
            const blogs = snapShot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })
            setBlogs(blogs)
        })
    }, [])
    useEffect(() => {
        if (blogs.length && blogs[0].title) {
            document.title = blogs[0].title;
        }
        else {
            document.title = "No Blog!!!"
        }
    }
    )
    //Passing the synthetic event as argument to stop refreshing the page on submit
    async function handleSubmit(e) {
        e.preventDefault();
        // setBlogs([{ title, content }, ...blogs])
        //we can use any of the two 
        //dispatch({ type: "ADD", blog: { title, content } })
        setTitle("");
        setContent("");
        titleRef.current.focus();
        const docRef = doc(collection(db, "blogs"))
        //u can use setDoc orr addDoc
        await setDoc(docRef,
            {
                title: title,
                content: content,
                createdOn: new Date()
            });

    }
    async function removeBlog(id) {
        //setBlogs(blogs.filter((blog, index) => (i !== index)))
        // dispatch({ type: "REMOVE", index: i })
        const docRef = doc(db, "blogs", id)
        await deleteDoc(docRef);

    }

    return (
        <>
            {/* Heading of the page */}
            <h1>Write a Blog!</h1>

            {/* Division created to provide styling of section to the form */}
            <div className="section">

                {/* Form for to write the blog */}
                <form onSubmit={handleSubmit}>

                    {/* Row component to create a row for first input field */}
                    <Row label="Title">
                        <input className="input"
                            placeholder="Enter the Title of the Blog here.."
                            value={title}
                            ref={titleRef}
                            onChange={(e) => setTitle(e.target.value)} />
                    </Row >

                    {/* Row component to create a row for Text area field */}
                    <Row label="Content">
                        <textarea className="input content"
                            placeholder="Content of the Blog goes here.."
                            value={content}
                            required
                            onChange={(e) => setContent(e.target.value)} />
                    </Row >

                    {/* Button to submit the blog */}
                    <button className="btn">ADD</button>
                </form>

            </div>

            <hr />

            {/* Section where submitted blogs will be displayed */}
            <h2> Blogs </h2>
            {blogs.map((blog, i) =>
            (
                <div className="blog" key={i}>
                    <h3>{blog.title}</h3>
                    <hr></hr>
                    <p>{blog.content}</p>
                    <div className="blog-btn">
                        <button onClick={() => removeBlog(blog.id)} className="remove">Delete</button>
                    </div>
                </div>
            ))}
        </>
    )
}

//Row component to introduce a new row section in the form
function Row(props) {
    const { label } = props;
    return (
        <>
            <label>{label}<br /></label>
            {props.children}
            <hr />
        </>
    )
}
