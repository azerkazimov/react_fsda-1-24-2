
export default function UserInfo({name, email, phone, adress="New York"}) {
    return (
        <div>
            <h1>User Information</h1>
            <p>Name: {name}</p>
            <p>Email:{email}</p>
            <p>Phone: {phone}</p>
            <p>Location: {adress}</p>
        </div>
    );
}