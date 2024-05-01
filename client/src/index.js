import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import LoadingPage from "./components/common/Loading";
import { CommonContextProvider } from "./context/common/CommonContext";

const root = ReactDOM.createRoot( document.getElementById( "root" ) );
root.render(
	<React.Fragment>
		<CommonContextProvider>
			<AuthContextProvider>
				<LoadingPage className="zingLoading" />
				<App />
			</AuthContextProvider>
		</CommonContextProvider>

	</React.Fragment>
);
