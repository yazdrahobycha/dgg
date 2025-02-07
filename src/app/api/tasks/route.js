import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import Task from '../../../../models/Task';
import {randoSequence} from "@nastyox/rando.js";
import {defaultTask} from "@/constants";

// GET all items
export async function GET(request) {
    await dbConnect();
    try {
        // Get the count from the query parameters
        const { searchParams } = new URL(request.url);
        const count = parseInt(searchParams.get('count'), 10) || 6;

        const tasks = await Task.find({ isUsed: false });

        let shuffledTasks = randoSequence(tasks).map((item) => item.value);
        const selectedTasks = shuffledTasks.slice(0, count);

        console.log(tasks.length)

        await Task.updateMany(
            { _id: { $in: selectedTasks.map(task => task._id) } },
            { $set: { isUsed: true } }
        );

        selectedTasks.push({name: defaultTask})

        return NextResponse.json({ success: true, data: selectedTasks }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error }, { status: 400 });
    }
}

// POST a new item
// export async function GET(req) {
//     await dbConnect();
//     try {
//         for (const taskName of tasks) {
//             await Task.create({ name: taskName, isUsed: false });
//         }
//         return NextResponse.json({ success: true}, { status: 20 });
//     } catch (error) {
//         return NextResponse.json({ success: false, message: error }, { status: 400 });
//     }
// }
