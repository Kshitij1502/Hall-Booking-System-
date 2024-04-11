exports.getHallById = async (req, res) => {
    const hallId = req.params.hallId;

    console.log('Fetching hall with ID:', hallId);

    try {
        const hall = await Hall.findById(hallId);
        console.log('Fetched hall:', hall);
        if (!hall) {
            return res.status(404).json({ message: 'Hall not found' });
        }
        res.json(hall);
    } catch (error) {
        console.error('Error fetching hall:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
