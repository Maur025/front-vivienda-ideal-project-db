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

interface PropertyVisit {
	id: string;
	name?: string;
	visitQuantity?: string;
	clients?: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const PropertyVisit = ({ reload }: { reload: boolean }): JSX.Element => {
	const [newPayment, setNewPayment] = useState({
		type: "",
	});

	const [propertyVisitList, setPropertyVisitList] = useState<PropertyVisit[]>([]);

	const handleContract = (): void => {};

	useEffect(() => {
		const getPropertyVisitList = async () => {
			const responseApi = await fetch(`${apiUrl}/property`);

			const data = await responseApi.json();
			setPropertyVisitList(data);
		};

		getPropertyVisitList();
	}, [reload]);

	return (
		<TabsContent value="visitasInmuebles" className="space-y-6">
			<div className="flex justify-between items-center">
				<h2 className="text-xl font-semibold text-gray-100">
					Gestión de Visitas a Inmuebles
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
					<CardTitle className="text-gray-100">Visitas a inmuebles</CardTitle>
					<CardDescription className="text-gray-400">
						Lista de visitas a inmuebles.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow className="border-gray-800">
								<TableHead className="text-gray-300">Inmueble</TableHead>
								<TableHead className="text-gray-300">Cantidad de visitas</TableHead>
								<TableHead className="text-gray-300">Clientes</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{propertyVisitList.map((propertyVisit) => (
								<TableRow key={propertyVisit.id} className="border-gray-800">
									<TableCell className="text-gray-100 font-medium">
										{propertyVisit.name ?? "S/N"}
									</TableCell>
									<TableCell className="text-gray-300 max-w-xs truncate">
										{propertyVisit.visitQuantity ?? "S/N"}
									</TableCell>
									<TableCell className="text-gray-300">
										{propertyVisit.clients ?? "S/N"}
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

export default PropertyVisit;
