import { ObjectId } from 'mongodb';

import { getUsersCollection, getTasksCollection } from '../db';

const id = {
  user1: new ObjectId(),
  user2: new ObjectId(),
  task1: new ObjectId(),
  task2: new ObjectId(),
  task3: new ObjectId(),
  task4: new ObjectId(),
  task5: new ObjectId(),
};

export const data = {
  users: [
    {
      _id: id.user1,
      categories: ['work', 'personal'],
    },
    {
      _id: id.user2,
      categories: ['home', 'cycling club'],
    },
  ],
  tasks: [
    {
      _id: id.task1,
      title: 'Schedule vet appointment',
      category: 'personal',
      createdBy: id.user1,
      complete: false,
    },
    {
      _id: id.task2,
      title: 'Review intern resumes',
      category: 'work',
      createdBy: id.user1,
      complete: false,
    },
    {
      _id: id.task3,
      title: 'Make grocery list',
      category: 'home',
      createdBy: id.user2,
      complete: false,
    },
    {
      _id: id.task4,
      title: 'Play fetch with Sparkles',
      category: 'home',
      createdBy: id.user2,
      complete: false,
    },
    {
      _id: id.task5,
      title: 'Send reminders for Sunday meetup',
      category: 'cycling club',
      createdBy: id.user2,
      complete: false,
    },
  ],
};

export async function loadExampleData() {
  const { users, tasks } = data;

  const resultUsers = await getUsersCollection().insertMany(users);
  const resultTasks = await getTasksCollection().insertMany(tasks);

  console.log(
    `Data was loaded. 
    - ${resultUsers.insertedCount} users inserted.
    - ${resultTasks.insertedCount} tasks inserted.
    `
  );
}
