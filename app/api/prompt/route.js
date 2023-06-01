import { parse } from 'querystring';

import { connectToDatabase } from '@utils/database';
import Prompt from '@models/prompt';

export const GET = async (req, res) => {
  try {
    await connectToDatabase();

    const queryParams = parse(req.url.split('?')[1]);

    // get query params and set defaults
    let limit = queryParams.limit ? Number(queryParams.limit) : 9;
    let page = queryParams.page ? Number(queryParams.page) : 1;

    // calculate how many to skip
    const skip = (page - 1) * limit;

    // query the database
    const prompts = await Prompt.find({})
      .skip(skip)
      .limit(limit)
      .populate('creator');

    // // get total count for pagination
    const totalCount = await Prompt.countDocuments({});

    return new Response(JSON.stringify({ prompts, totalCount }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
};
