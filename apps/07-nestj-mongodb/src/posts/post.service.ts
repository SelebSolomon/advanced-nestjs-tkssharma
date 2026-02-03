import { Model, QueryFilter } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schema/post.schema';
import { NotFoundException } from '@nestjs/common';
import PostDto from './dto/create-post.dto';
import { User } from '../users/schema/user.schema';
import UpdatePostDto from './dto/update-post.dto';

@Injectable()
class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async findAll(
    documentsToSkip = 0,
    limitOfDocuments?: number,
    startId?: string,
    searchQuery?: string,
  ) {
    const filters: QueryFilter<PostDocument> = startId
      ? {
          _id: {
            $gt: startId,
          },
        }
      : {};

    if (searchQuery) {
      filters.$text = {
        $search: searchQuery,
      };
    }

    const findQuery = this.postModel
      .find(filters)
      .sort({ _id: 1 })
      .skip(documentsToSkip)
      .populate('author')
      .populate('categories')
      .populate('series');

    if (limitOfDocuments) {
      findQuery.limit(limitOfDocuments);
    }

    const results = await findQuery;
    const count = await this.postModel.countDocuments(filters);

    return { results, count };
  }

  async findOne(id: string) {
    const post = await this.postModel
      .findById(id)
      .populate('author')
      .populate('categories')
      .populate('series');
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }

  async create(postData: PostDto, author: User) {
    const createdPost = new this.postModel({
      ...postData,
      author,
    });
    await createdPost.populate('categories');
    return createdPost.save();
  }

  async update(id: string, postData: UpdatePostDto) {
    const post = await this.postModel
      .findOneAndReplace({ _id: id }, postData, { new: true })
      .populate('author')
      .populate('categories')
      .populate('series');
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }

  async delete(postId: string) {
    const result = await this.postModel.findByIdAndDelete(postId);
    if (!result) {
      throw new NotFoundException();
    }
  }
}

export default PostsService;
