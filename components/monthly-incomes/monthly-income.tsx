import { JSX, useEffect, useState } from "react";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { TabsContent } from "@/components/ui/tabs";
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

interface MonthlyIncome {
	contractTypeId: string;
	name?: string;
	total?: string;
	commissions?: string;
	pays?: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const MonthlyIncome = ({ reload }: { reload: boolean }): JSX.Element => {
	const [newPayment, setNewPayment] = useState({
		type: "",
	});

	const [monthlyIncomeList, setMonthlyIncomeList] = useState<MonthlyIncome[]>([]);
	const [filterRequest, setFilterRequest] = useState<{ date: Date }>({ date: new Date() });

	const handleContract = (): void => {};

	const onChangeDate = (event: any) => {
		setFilterRequest((prev) => ({
			...prev,
			date: new Date(event.target?.value),
		}));
	};

	useEffect(() => {
		const getMontlyIncomeList = async () => {
			const responseApi = await fetch(
				`${apiUrl}/contract/contract-types?date=${filterRequest.date.toISOString()}`,
			);

			const data = await responseApi.json();
			console.log(data);

			setMonthlyIncomeList(data);
		};

		getMontlyIncomeList();
	}, [reload, filterRequest.date]);

	return (
		<TabsContent value="ingresosMensuales" className="space-y-6">
			<div className="flex justify-between items-center">
				<h2 className="text-xl font-semibold text-gray-100">
					Gestión de Ingresos mensuales
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
								Completa los datos para agregar un nuevo elemento a la lista.
							</DialogDescription>
						</DialogHeader>
						<div className="space-y-4">
							<div>
								<Label htmlFor="item-priority" className="text-gray-300">
									tipo
								</Label>
								<Select
									value={newPayment.type}
									onValueChange={(value) =>
										setNewPayment({
											...newPayment,
											type: value,
										})
									}
								>
									<SelectTrigger className="bg-gray-800 border-gray-700 text-gray-100">
										<SelectValue placeholder="Selecciona el tipo de contrato" />
									</SelectTrigger>
									<SelectContent className="bg-gray-800 border-gray-700">
										<SelectItem value="Alta">Alta</SelectItem>
										<SelectItem value="Media">Media</SelectItem>
										<SelectItem value="Baja">Baja</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<Button
								onClick={handleContract}
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
					<CardTitle className="text-gray-100">Ingresos mensuales</CardTitle>
					<CardDescription className="text-gray-400">
						Lista de ingresos mensuales.
					</CardDescription>
				</CardHeader>
				<div>
					<div className="space-y-4 w-72 my-4 ms-8">
						<div>
							<Label htmlFor="item-priority" className="text-gray-300">
								Mes:
							</Label>
							<input
								type="date"
								className="bg-gray-800 border-gray-700 text-gray-100 p-2 mx-4"
								onChange={onChangeDate}
							/>
						</div>
					</div>
				</div>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow className="border-gray-800">
								<TableHead className="text-gray-300">Nombre de Operacion</TableHead>
								<TableHead className="text-gray-300">Total</TableHead>
								<TableHead className="text-gray-300">Total Comisiones</TableHead>
								<TableHead className="text-gray-300">
									Total Pagos Realizados{" "}
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{monthlyIncomeList.map((monthlyIncome) => (
								<TableRow
									key={monthlyIncome.contractTypeId}
									className="border-gray-800"
								>
									<TableCell className="text-gray-100 font-medium">
										{monthlyIncome.name ?? "S/N"}
									</TableCell>
									<TableCell className="text-gray-300 max-w-xs truncate">
										{monthlyIncome.total ?? "S/N"}
									</TableCell>
									<TableCell className="text-gray-300">
										{monthlyIncome.commissions ?? "S/N"}
									</TableCell>
									<TableCell className="text-gray-300">
										{monthlyIncome.pays ?? "S/N"}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</TabsContent>
	);
};

export default MonthlyIncome;
