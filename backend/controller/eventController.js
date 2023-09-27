const eventModel = require('../model/event');

const addEvent = async (req, res) => {
    try{
        const {eventName,eventDescription, date, divisions, deadlineDate, tnc, open } = req.body;

        if (!eventName || !eventDescription || !date || !divisions || !deadlineDate || !tnc) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const eventInserted = { eventName, eventDescription, date, divisions, deadlineDate, tnc, open } 

        const newEvent= await eventModel.create(eventInserted);
        await newEvent.save();

        return res.status(201).json({ message: 'Event registered successfully' });
    }catch{error}{
        console.error(error);
        
        return res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = {addEvent};