"use client";

import { useState } from "react";
import { BarChart3, FileText, List, Plus, Search, TrendingUp, Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import Contract from "@/components/contract-report/contract";
import PendingPayment from "@/components/pending-payment/pending-payment";
import PropertyVisit from "@/components/property-visit/property-visit";
import MonthlyIncome from "@/components/monthly-incomes/monthly-income";
import AgentCommission from "@/components/agent-commission/agent-commission";

interface ReportItem {
	id: string;
	name: string;
	type: string;
	date: string;
	status: string;
}

interface ListItem {
	id: string;
	title: string;
	description: string;
	category: string;
	priority: string;
	createdAt: string;
}

export default function Dashboard() {
	const [reports, setReports] = useState<ReportItem[]>([
		{
			id: "1",
			name: "Reporte Mensual",
			type: "Ventas",
			date: "2024-01-15",
			status: "Completado",
		},
		{
			id: "2",
			name: "Análisis Q4",
			type: "Financiero",
			date: "2024-01-10",
			status: "En Progreso",
		},
		{
			id: "3",
			name: "Reporte de Usuarios",
			type: "Analytics",
			date: "2024-01-08",
			status: "Completado",
		},
	]);

	const [listItems, setListItems] = useState<ListItem[]>([
		{
			id: "1",
			title: "Implementar Dashboard",
			description: "Crear interfaz principal del sistema",
			category: "Desarrollo",
			priority: "Alta",
			createdAt: "2024-01-15",
		},
		{
			id: "2",
			title: "Revisar Base de Datos",
			description: "Optimizar consultas y rendimiento",
			category: "Backend",
			priority: "Media",
			createdAt: "2024-01-14",
		},
		{
			id: "3",
			title: "Testing de UI",
			description: "Pruebas de interfaz de usuario",
			category: "QA",
			priority: "Alta",
			createdAt: "2024-01-13",
		},
	]);

	const [isReloadLists, setIsReloadLists] = useState<boolean>(false);

	const [newReport, setNewReport] = useState({ name: "", type: "", date: "" });
	const [newListItem, setNewListItem] = useState({
		title: "",
		description: "",
		category: "",
		priority: "",
	});

	const handleAddReport = () => {
		if (newReport.name && newReport.type && newReport.date) {
			const report: ReportItem = {
				id: Date.now().toString(),
				name: newReport.name,
				type: newReport.type,
				date: newReport.date,
				status: "En Progreso",
			};
			setReports([...reports, report]);
			setNewReport({ name: "", type: "", date: "" });
		}
	};

	const handleAddListItem = () => {
		if (
			newListItem.title &&
			newListItem.description &&
			newListItem.category &&
			newListItem.priority
		) {
			const item: ListItem = {
				id: Date.now().toString(),
				title: newListItem.title,
				description: newListItem.description,
				category: newListItem.category,
				priority: newListItem.priority,
				createdAt: new Date().toISOString().split("T")[0],
			};
			setListItems([...listItems, item]);
			setNewListItem({ title: "", description: "", category: "", priority: "" });
		}
	};

	const reloadLists = (): void => {
		setIsReloadLists((prev) => !prev);
	};

	const getPriorityColor = (priority: string) => {
		switch (priority) {
			case "Alta":
				return "text-red-400";
			case "Media":
				return "text-yellow-400";
			case "Baja":
				return "text-green-400";
			default:
				return "text-gray-400";
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "Completado":
				return "text-green-400";
			case "En Progreso":
				return "text-yellow-400";
			case "Pendiente":
				return "text-red-400";
			default:
				return "text-gray-400";
		}
	};

	return (
		<div className="min-h-screen bg-gray-950 text-gray-100">
			{/* Header */}
			<header className="border-b border-gray-800 bg-gray-900/50">
				<div className="container mx-auto px-4 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<BarChart3 className="h-8 w-8 text-blue-400" />
							<h1 className="text-2xl font-bold">Dashboard de Reportes</h1>
						</div>
						<div className="flex items-center space-x-4">
							<div className="relative">
								<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
								<Input
									placeholder="Buscar..."
									className="pl-10 bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400"
								/>
							</div>
						</div>
					</div>
				</div>
			</header>

			<div className="container mx-auto px-4 py-8">
				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
					<Card className="bg-gray-900 border-gray-800">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-gray-400">
								Total Reportes
							</CardTitle>
							<FileText className="h-4 w-4 text-blue-400" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-gray-100">{reports.length}</div>
							<p className="text-xs text-gray-400">+2 desde el mes pasado</p>
						</CardContent>
					</Card>

					<Card className="bg-gray-900 border-gray-800">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-gray-400">
								Items en Lista
							</CardTitle>
							<List className="h-4 w-4 text-green-400" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-gray-100">
								{listItems.length}
							</div>
							<p className="text-xs text-gray-400">+5 esta semana</p>
						</CardContent>
					</Card>

					<Card className="bg-gray-900 border-gray-800">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-gray-400">
								Completados
							</CardTitle>
							<TrendingUp className="h-4 w-4 text-purple-400" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-gray-100">
								{reports.filter((r) => r.status === "Completado").length}
							</div>
							<p className="text-xs text-gray-400">85% tasa de completado</p>
						</CardContent>
					</Card>

					<Card className="bg-gray-900 border-gray-800">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-gray-400">
								Este Mes
							</CardTitle>
							<Calendar className="h-4 w-4 text-orange-400" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-gray-100">12</div>
							<p className="text-xs text-gray-400">Nuevos elementos</p>
						</CardContent>
					</Card>
				</div>

				{/* Main Content */}
				<Tabs defaultValue="contratos" className="space-y-6">
					<TabsList className="bg-gray-900 border-gray-800">
						<TabsTrigger value="contratos" onClick={() => reloadLists()}>
							<FileText className="h-4 w-4 mr-2" />
							Contratos Activos y Vencidos
						</TabsTrigger>

						<TabsTrigger value="pagosPendientes" onClick={() => reloadLists()}>
							<FileText className="h-4 w-4 mr-2" />
							Pagos pendientes por cliente o inmueble.
						</TabsTrigger>

						<TabsTrigger value="ingresosMensuales" onClick={() => reloadLists()}>
							<FileText className="h-4 w-4 mr-2" />
							Ingresos mensuales
						</TabsTrigger>

						<TabsTrigger value="comisionesAgente" onClick={() => reloadLists()}>
							<FileText className="h-4 w-4 mr-2" />
							Comisiones por Agente
						</TabsTrigger>

						<TabsTrigger value="visitasInmuebles" onClick={() => reloadLists()}>
							<FileText className="h-4 w-4 mr-2" />
							Visitas a inmuebles
						</TabsTrigger>
					</TabsList>

					{/* Reports Tabs */}
					<Contract />
					<PendingPayment />
					<MonthlyIncome reload={isReloadLists} />
					<AgentCommission reload={isReloadLists} />
					<PropertyVisit reload={isReloadLists} />

					{/* Reports Tab - no use*/}
					<TabsContent value="reports" className="space-y-6">
						<div className="flex justify-between items-center">
							<h2 className="text-xl font-semibold text-gray-100">
								Gestión de Reportes
							</h2>
							<Dialog>
								<DialogTrigger asChild>
									<Button className="bg-blue-600 hover:bg-blue-700">
										<Plus className="h-4 w-4 mr-2" />
										Nuevo Reporte
									</Button>
								</DialogTrigger>
								<DialogContent className="bg-gray-900 border-gray-800 text-gray-100">
									<DialogHeader>
										<DialogTitle>Crear Nuevo Reporte</DialogTitle>
										<DialogDescription className="text-gray-400">
											Completa los datos para generar un nuevo reporte.
										</DialogDescription>
									</DialogHeader>
									<div className="space-y-4">
										<div>
											<Label htmlFor="report-name" className="text-gray-300">
												Nombre del Reporte
											</Label>
											<Input
												id="report-name"
												value={newReport.name}
												onChange={(e) =>
													setNewReport({
														...newReport,
														name: e.target.value,
													})
												}
												className="bg-gray-800 border-gray-700 text-gray-100"
												placeholder="Ej: Reporte de Ventas Q1"
											/>
										</div>
										<div>
											<Label htmlFor="report-type" className="text-gray-300">
												Tipo
											</Label>
											<Select
												value={newReport.type}
												onValueChange={(value) =>
													setNewReport({ ...newReport, type: value })
												}
											>
												<SelectTrigger className="bg-gray-800 border-gray-700 text-gray-100">
													<SelectValue placeholder="Selecciona un tipo" />
												</SelectTrigger>
												<SelectContent className="bg-gray-800 border-gray-700">
													<SelectItem value="Ventas">Ventas</SelectItem>
													<SelectItem value="Financiero">
														Financiero
													</SelectItem>
													<SelectItem value="Analytics">
														Analytics
													</SelectItem>
													<SelectItem value="Marketing">
														Marketing
													</SelectItem>
												</SelectContent>
											</Select>
										</div>
										<div>
											<Label htmlFor="report-date" className="text-gray-300">
												Fecha
											</Label>
											<Input
												id="report-date"
												type="date"
												value={newReport.date}
												onChange={(e) =>
													setNewReport({
														...newReport,
														date: e.target.value,
													})
												}
												className="bg-gray-800 border-gray-700 text-gray-100"
											/>
										</div>
										<Button
											onClick={handleAddReport}
											className="w-full bg-blue-600 hover:bg-blue-700"
										>
											Crear Reporte
										</Button>
									</div>
								</DialogContent>
							</Dialog>
						</div>

						<Card className="bg-gray-900 border-gray-800">
							<CardHeader>
								<CardTitle className="text-gray-100">Lista de Reportes</CardTitle>
								<CardDescription className="text-gray-400">
									Gestiona y visualiza todos tus reportes generados.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Table>
									<TableHeader>
										<TableRow className="border-gray-800">
											<TableHead className="text-gray-300">Nombre</TableHead>
											<TableHead className="text-gray-300">Tipo</TableHead>
											<TableHead className="text-gray-300">Fecha</TableHead>
											<TableHead className="text-gray-300">Estado</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{reports.map((report) => (
											<TableRow key={report.id} className="border-gray-800">
												<TableCell className="text-gray-100 font-medium">
													{report.name}
												</TableCell>
												<TableCell className="text-gray-300">
													{report.type}
												</TableCell>
												<TableCell className="text-gray-300">
													{report.date}
												</TableCell>
												<TableCell
													className={getStatusColor(report.status)}
												>
													{report.status}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Lists Tab - no use */}
					<TabsContent value="lists" className="space-y-6">
						<div className="flex justify-between items-center">
							<h2 className="text-xl font-semibold text-gray-100">
								Gestión de Listas
							</h2>
							<Dialog>
								<DialogTrigger asChild>
									<Button className="bg-green-600 hover:bg-green-700">
										<Plus className="h-4 w-4 mr-2" />
										Nuevo Item
									</Button>
								</DialogTrigger>
								<DialogContent className="bg-gray-900 border-gray-800 text-gray-100">
									<DialogHeader>
										<DialogTitle>Agregar Nuevo Item</DialogTitle>
										<DialogDescription className="text-gray-400">
											Completa los datos para agregar un nuevo elemento a la
											lista.
										</DialogDescription>
									</DialogHeader>
									<div className="space-y-4">
										<div>
											<Label htmlFor="item-title" className="text-gray-300">
												Título
											</Label>
											<Input
												id="item-title"
												value={newListItem.title}
												onChange={(e) =>
													setNewListItem({
														...newListItem,
														title: e.target.value,
													})
												}
												className="bg-gray-800 border-gray-700 text-gray-100"
												placeholder="Ej: Implementar nueva funcionalidad"
											/>
										</div>
										<div>
											<Label
												htmlFor="item-description"
												className="text-gray-300"
											>
												Descripción
											</Label>
											<Input
												id="item-description"
												value={newListItem.description}
												onChange={(e) =>
													setNewListItem({
														...newListItem,
														description: e.target.value,
													})
												}
												className="bg-gray-800 border-gray-700 text-gray-100"
												placeholder="Descripción detallada del item"
											/>
										</div>
										<div>
											<Label
												htmlFor="item-category"
												className="text-gray-300"
											>
												Categoría
											</Label>
											<Select
												value={newListItem.category}
												onValueChange={(value) =>
													setNewListItem({
														...newListItem,
														category: value,
													})
												}
											>
												<SelectTrigger className="bg-gray-800 border-gray-700 text-gray-100">
													<SelectValue placeholder="Selecciona una categoría" />
												</SelectTrigger>
												<SelectContent className="bg-gray-800 border-gray-700">
													<SelectItem value="Desarrollo">
														Desarrollo
													</SelectItem>
													<SelectItem value="Backend">Backend</SelectItem>
													<SelectItem value="Frontend">
														Frontend
													</SelectItem>
													<SelectItem value="QA">QA</SelectItem>
													<SelectItem value="DevOps">DevOps</SelectItem>
												</SelectContent>
											</Select>
										</div>
										<div>
											<Label
												htmlFor="item-priority"
												className="text-gray-300"
											>
												Prioridad
											</Label>
											<Select
												value={newListItem.priority}
												onValueChange={(value) =>
													setNewListItem({
														...newListItem,
														priority: value,
													})
												}
											>
												<SelectTrigger className="bg-gray-800 border-gray-700 text-gray-100">
													<SelectValue placeholder="Selecciona la prioridad" />
												</SelectTrigger>
												<SelectContent className="bg-gray-800 border-gray-700">
													<SelectItem value="Alta">Alta</SelectItem>
													<SelectItem value="Media">Media</SelectItem>
													<SelectItem value="Baja">Baja</SelectItem>
												</SelectContent>
											</Select>
										</div>
										<Button
											onClick={handleAddListItem}
											className="w-full bg-green-600 hover:bg-green-700"
										>
											Agregar Item
										</Button>
									</div>
								</DialogContent>
							</Dialog>
						</div>

						<Card className="bg-gray-900 border-gray-800">
							<CardHeader>
								<CardTitle className="text-gray-100">Lista de Elementos</CardTitle>
								<CardDescription className="text-gray-400">
									Organiza y gestiona todos los elementos de tu lista de tareas.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Table>
									<TableHeader>
										<TableRow className="border-gray-800">
											<TableHead className="text-gray-300">Título</TableHead>
											<TableHead className="text-gray-300">
												Descripción
											</TableHead>
											<TableHead className="text-gray-300">
												Categoría
											</TableHead>
											<TableHead className="text-gray-300">
												Prioridad
											</TableHead>
											<TableHead className="text-gray-300">Fecha</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{listItems.map((item) => (
											<TableRow key={item.id} className="border-gray-800">
												<TableCell className="text-gray-100 font-medium">
													{item.title}
												</TableCell>
												<TableCell className="text-gray-300 max-w-xs truncate">
													{item.description}
												</TableCell>
												<TableCell className="text-gray-300">
													{item.category}
												</TableCell>
												<TableCell
													className={getPriorityColor(item.priority)}
												>
													{item.priority}
												</TableCell>
												<TableCell className="text-gray-300">
													{item.createdAt}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
