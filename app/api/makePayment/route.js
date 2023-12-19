import makePayment from '@mongodb/makePayment';

export const POST = async (request) => {
    const data = await request.json();
    const response = await makePayment(data);

    if(response == -1)
        return Response.json({message: "Something went wrong."}, {status: 500});
    else   
        return Response.json(response);
}