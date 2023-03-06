import Header from '../LayoutComponents/Header';

// children = Page
function HeaderOnlyLayout({ children }) {
    return (
        <div>
            <Header containerType="container" isNav={true} />
            <div className="container">
                <div className="row ">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12 ">
                        <div id="content" className="content">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderOnlyLayout;
