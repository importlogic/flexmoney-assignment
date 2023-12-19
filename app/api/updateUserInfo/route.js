import enrollUser from "@mongodb/enrollUser";

export const POST = async (request) => {
    const data = await request.json();
    const response = await enrollUser(data);

    console.log(data)
    console.log(response)

    if(response === -1)
        return Response.json({message: 'Some error occured.'}, {status: 500});

    return Response.json(response);
}