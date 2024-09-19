import './Loading.css'

const Loading = ({ loading }) => {
    return (
        loading &&
        <section className="loading dots-container">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </section>
    )
}

export default Loading