import { Route, Routes } from "react-router-dom";
import SnackbarProvider from "react-simple-snackbar";
import "./App.css";
import ClientTable from "./components/tables/ClientTable";

import Home from "./components/Home";
import Layout from "./components/Layout";
import CreateClient from "./components/create/CreateClient";

import UpdateClient from "./components/update/UpdateClient";

import { MyReport } from "./components/MyReport";
import ProviderTable from "./components/tables/ProviderTable";
import CreateProvider from "./components/create/CreateProvider";
import UpdateProvider from "./components/update/UpdateProvider";
import ModelTable from "./components/tables/ModelTable";
import CreateModel from "./components/create/CreateModel";
import UpdateModel from "./components/update/UpdateModel";

function App() {
	return (
		<>
			<SnackbarProvider>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="clients" element={<ClientTable />} />
						<Route path="providers" element={<ProviderTable />} />
						<Route path="models" element={<ModelTable />} />

						<Route path="create-client" element={<CreateClient />} />
						<Route path="create-provider" element={<CreateProvider />} />
						<Route path="create-model" element={<CreateModel />} />

						<Route path="update-client/:id" element={<UpdateClient />} />
						<Route path="update-provider/:id" element={<UpdateProvider />} />
						<Route path="update-model/:id" element={<UpdateModel />} />

						<Route path="report" element={<MyReport />} />

						<Route path="*" element={<></>} />
					</Route>
				</Routes>
			</SnackbarProvider>
		</>
	);
}

export default App;
