import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async (): Promise<typeof mongoose> =>
            await mongoose.connect('mongodb+srv://agentheo:DpENWosEnRtghWhg@cluster0.5ge86ol.mongodb.net/?retryWrites=true&w=majority'), 
    },
]