import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (

        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav">
                    <div className="sb-sidenav-menu-heading">Core</div>
                    <Link className="nav-link" to="/admin/dashboard">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Dashboard
                    </Link>
                    <div className="sb-sidenav-menu-heading">Category</div>

                    <Link className="nav-link" to="/admin/category">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Add Category
                    </Link>
                    <Link className="nav-link" to="/admin/category/view">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        View Category
                    </Link>
                    <div className="sb-sidenav-menu-heading">Products</div>
                    <Link className="nav-link" to="/admin/products">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Add Products
                    </Link>
                    <Link className="nav-link" to="/admin/products/view">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        View Products
                    </Link>
                    <div className="sb-sidenav-menu-heading">Addons</div>
                </div>
            </div>
            <div className="sb-sidenav-footer">
                <div className="small">Logged in as:</div>
                {localStorage.getItem('auth_email')}
            </div>
        </nav>
)
}

export default Sidebar