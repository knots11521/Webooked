export default async (req, res) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const data = req.body || {};

        if (data.honeypot && data.honeypot.trim() !== '') {
            return res.status(200).json({ success: true });
        }

        const required = ['name', 'email'];
        for (const field of required) {
            if (!data[field] || !data[field].toString().trim()) {
                return res.status(400).json({ error: 'Missing required field: ' + field });
            }
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(String(data.email).trim())) {
            return res.status(400).json({ error: 'Invalid email address' });
        }

        for (const [key, value] of Object.entries(data)) {
            if (typeof value === 'string' && value.length > 500) {
                return res.status(400).json({ error: 'Field too long: ' + key });
            }
        }

        const webhookUrl = process.env.WEBHOOK_URL;

        if (!webhookUrl) {
            console.error('WEBHOOK_URL not configured');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const body = await response.text();
            console.error('Webhook error:', response.status, body);
            return res.status(502).json({ error: 'Failed to submit' });
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Submission error:', error);
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
};
