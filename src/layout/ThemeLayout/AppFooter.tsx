const AppFooter = () => {
  const currentDate = new Date();
  return (
    <div className="layout-footer">
      <div className="footer-logo-container">
        <img src="/images/logo/logo.png" alt="logo" />
      </div>
      <span className="footer-copyright">
        &#169; Happy Flow - {currentDate.getFullYear()}
      </span>
    </div>
  );
};

export default AppFooter;
