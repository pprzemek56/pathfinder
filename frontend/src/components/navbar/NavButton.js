function NavButton({ id, label }) {
    return (
        <li className="nav-item">
            <button type="button" className="btn btn-primary btn-lg" id={id}>{label}</button>
        </li>
    );
}

export default NavButton;