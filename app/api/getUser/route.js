export const dynamic = 'force-dynamic';

import getUser from '@mongodb/getUser.js';

export const GET = async (request) => {
    const username = request.nextUrl.searchParams.get("username");
    const response = await getUser(username);

    if(response == -1)
        return Response.json({message: 'Some error occured.'}, {status: 500});

    return Response.json(response);
}