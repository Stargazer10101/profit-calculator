'use client'

import { useState, useEffect } from 'react';

export default function Report() {
    const [formData, setFormData] = useState({
        labourWages: 0,
        electricity: 0,
        rent: 0,
        waterBill: 0,
        petrol: 0,
        diesel: 0,
        medicine: 0,
        food: 0,
        chickDepreciation: 0,
        interest: 0,
        parts: 0,
    });

    const [expense, setExpense] = useState({
        totalDailyExpense: 0,
        totalMonthlyExpense: 0
    })

    const [numOfEggs, setNumOfEggs] = useState(0);
    const [pricePer100Eggs, setPricePer100Eggs] = useState(0);
    const [perEggTotalDailyExpense, setPerEggTotalDailyExpense] = useState(0);
    const [perEggTotalDailyProfit, setPerEggTotalDailyProfit] = useState(0);
    const [perEggSellingPrice, setPerEggSellingPrice] = useState(0);





    useEffect(() => {
        // Calculate total monthly expenses
        const calculateMonthlyExpense = () => {
            const monthlyExpenses = ['labourWages', 'electricity', 'rent', 'waterBill', 'petrol', 'diesel'];
            const dailyExpenses = ['medicine', 'food', 'chickDepreciation', 'interest'];
            const miscExpenses = ['parts'];
            const miscMonthlyExpenses = (miscExpenses.reduce((acc, expense) => acc + parseFloat(formData[expense] || 0), 0) / (365 * 1.5)) * 30;
            let totalDailyExpense = (dailyExpenses.reduce((acc, expense) => acc + parseFloat(formData[expense] || 0), 0) * 30);
            totalDailyExpense = isNaN(totalDailyExpense) ? 0 : totalDailyExpense.toFixed(2);
            let totalMonthlyExpense = monthlyExpenses.reduce((acc, expense) => acc + parseFloat(formData[expense] || 0), 0) + parseFloat(totalDailyExpense) + parseFloat(miscMonthlyExpenses);
            totalMonthlyExpense = totalMonthlyExpense.toFixed(2)
            setExpense(prevData => ({ ...prevData, totalMonthlyExpense }));
        };

        // Calculate total daily expenses and multiply by 30
        const calculateDailyExpense = () => {
            const dailyExpenses = ['medicine', 'food', 'chickDepreciation', 'interest'];
            // const totalDailyExpense = (dailyExpenses.reduce((acc, expense) => acc + parseFloat(formData[expense] || 0), 0) * 30);
            const monthlyExpenses = ['labourWages', 'electricity', 'rent', 'waterBill', 'petrol', 'diesel'];
            const miscExpenses = ['parts'];
            const miscMonthlyExpenses = (miscExpenses.reduce((acc, expense) => acc + parseFloat(formData[expense] || 0), 0) / (365 * 1.5));
            const totalMonthlyDailyExpense = monthlyExpenses.reduce((acc, expense) => acc + parseFloat(formData[expense] || 0), 0) / 30;
            let totalDailyExpense = (dailyExpenses.reduce((acc, expense) => acc + parseFloat(formData[expense] || 0), 0)) + parseFloat(totalMonthlyDailyExpense) + parseFloat(miscMonthlyExpenses);
            totalDailyExpense = totalDailyExpense.toFixed(2)
            setExpense(prevData => ({ ...prevData, totalDailyExpense }));
        };

        const handleCalculate = () => {
            if (numOfEggs && pricePer100Eggs) {
                calculateTotalExpense();
            }
        };

        const calculateTotalExpense = () => {
            // calculate per egg selling cost
            const numOfSets = Math.ceil(numOfEggs / 100); // Calculate number of sets of 100 eggs
            let totalSellingPrice = parseFloat(numOfSets) * parseFloat(pricePer100Eggs); // Calculate total price
            totalSellingPrice = totalSellingPrice.toFixed(2)
            setPerEggSellingPrice(totalSellingPrice);

            // calculate per egg production cost

            let productionCost = expense['totalDailyExpense'];
            setPerEggTotalDailyExpense(productionCost);

            // calculate per egg profit
            let profit = parseFloat(totalSellingPrice) - parseFloat(productionCost);
            profit = profit.toFixed(2)
            setPerEggTotalDailyProfit(profit);
        };
        calculateMonthlyExpense();
        calculateDailyExpense();
        handleCalculate();
    }, [expense, pricePer100Eggs, formData, numOfEggs, perEggTotalDailyExpense, perEggTotalDailyProfit, perEggSellingPrice]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };


    return (
        <div className="my-report p-4">
            <form onSubmit={handleSubmit}>
                <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                    <div className="mb-3">
                        <h2 className="text-lg font-semibold mb-2">Report Name</h2>
                        <input type="text" id="email" placeholder="Enter name" className="mt-2 w-full flex h-12 items-center justify-center rounded-sm border bg-white p-3 text-sm outline-none border-gray-200" />
                    </div>
                </div>
                <div className="flex flex-wrap justify-center lg:justify-between items-center">
                    <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                        <h2 className="text-lg font-semibold mb-2">Monthly Expenses</h2>
                        <div className="mb-4">
                            <label className="block mb-1">Labour Wages</label>
                            <input type="number" id="labourWages" min="0" name="labourWages" className="w-full border rounded px-3 py-2" value={formData.labourWages} onChange={handleChange} />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Electricity</label>
                            <input type="number" id="electricity" min="0" name="electricity" className="w-full border rounded px-3 py-2" value={formData.electricity} onChange={handleChange} />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Rent</label>
                            <input type="number" id="rent" min="0" name="rent" className="w-full border rounded px-3 py-2" value={formData.rent} onChange={handleChange} />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Water Bill</label>
                            <input type="number" id="waterBill" min="0" name="waterBill" className="w-full border rounded px-3 py-2" value={formData.waterBill} onChange={handleChange} />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Petrol</label>
                            <input type="number" id="petrol" min="0" name="petrol" className="w-full border rounded px-3 py-2" value={formData.petrol} onChange={handleChange} />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Diesel</label>
                            <input type="number" id="diesel" min="0" name="diesel" className="w-full border rounded px-3 py-2" value={formData.diesel} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                        <h2 className="text-lg font-semibold mb-2">Daily Expenses</h2>
                        <div className="mb-4">
                            <label className="block mb-1">Medicine</label>
                            <input type="number" id="medicine" min="0" name="medicine" className="w-full border rounded px-3 py-2" value={formData.medicine} onChange={handleChange} />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Food</label>
                            <input type="number" id="food" min="0" name="food" className="w-full border rounded px-3 py-2" value={formData.food} onChange={handleChange} />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Chick Depreciation</label>
                            <input type="number" min="0" id="chickDepreciation" name="chickDepreciation" className="w-full border rounded px-3 py-2" value={formData.chickDepreciation} onChange={handleChange} />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Interest on Investment</label>
                            <input type="number" min="0" id="interest" name="interest" className="w-full border rounded px-3 py-2" value={formData.interest} onChange={handleChange} />
                        </div>
                        <h2 className="text-lg font-semibold mb-2">Eggs Expenses</h2>
                        <div className="mb-4">
                            <label className="block mb-1">Number of Eggs:</label>
                            <input type="number" id="numOfEggs" min="0" name="numOfEggs" className="w-full border rounded px-3 py-2" value={numOfEggs} onChange={(e) => setNumOfEggs(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Price per 100 Eggs (in ₹):</label>
                            <input type="number" id="pricePer100Eggs" min="0" name="pricePer100Eggs" className="w-full border rounded px-3 py-2" value={pricePer100Eggs} onChange={(e) => setPricePer100Eggs(e.target.value)} />
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Miscellaneous Expenses</h2>
                            <div className="mb-4">
                                <label className="block mb-1">Parts</label>
                                <input type="number" min="0" id="parts" name="parts" className="w-full border rounded px-3 py-2" value={formData.parts} onChange={handleChange} />
                            </div>
                        </div>
                        {/* Displaying form data */}
                        <div className="border p-4">
                            <h2 className="text-lg font-semibold mb-2">Summary</h2>
                            <div className="mb-4">
                                <h3 className="font-semibold">Monthly Expenses</h3>
                                <ul>
                                    {Object.entries(formData).map(([key, value]) => {
                                        if (['labourWages', 'electricity', 'rent', 'waterBill', 'petrol', 'diesel'].includes(key)) {
                                            return value && <li key={key}>{key}: {value} ₹</li>;
                                        }
                                        return null;
                                    })}
                                </ul>
                            </div>
                            <div className="mb-4">
                                <h3 className="font-semibold">Daily Expenses</h3>
                                <ul>
                                    {Object.entries(formData).map(([key, value]) => {
                                        if (['medicine', 'food', 'chickDepreciation', 'interest'].includes(key)) {
                                            return value && <li key={key}>{key}: {value} ₹</li>;
                                        }
                                        return null;
                                    })}
                                </ul>
                            </div>
                            <div className="mb-4">
                                <h3 className="font-semibold">Miscellaneous Expenses</h3>
                                <ul>
                                    {Object.entries(formData).map(([key, value]) => {
                                        if (key === 'parts') {
                                            return value && <li key={key}>{key}: {value} ₹</li>;
                                        }
                                        return null;
                                    })}
                                </ul>
                            </div>
                            <h2 className="text-lg font-semibold mt-2">Total Daily Expense</h2>
                            <ul>
                                {Object.entries(expense).map(([key, value]) => (
                                    <li key={key}>{key}: {value > 0 ? `${value} ₹` : value}</li>
                                ))}
                            </ul>
                            <h2 className="text-lg font-semibold mt-2">Egg Profit Calculator Daily</h2>
                            <ul>
                                {(
                                    <div>
                                        <hr></hr>
                                        <li>Total per egg daily selling price: {perEggSellingPrice} ₹</li>
                                        <li>Total per egg daily expense: {perEggTotalDailyExpense} ₹</li>
                                        <li className="text-red-500">Total egg daily profit: {perEggTotalDailyProfit} ₹</li>
                                        <hr></hr>
                                        <li>Per egg daily selling price: {perEggSellingPrice / numOfEggs} ₹</li>
                                        <li>Per egg daily expense: {perEggTotalDailyExpense / numOfEggs} ₹</li>
                                        <li className="text-red-500">Per egg daily profit: {perEggTotalDailyProfit && numOfEggs ? perEggTotalDailyProfit / numOfEggs : ''} ₹</li>
                                        <hr></hr>
                                    </div>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </form>

        </div>
    );
}