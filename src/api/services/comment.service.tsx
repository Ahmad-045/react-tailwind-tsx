import {
  defaultCommentType,
  defaultLeadFormType,
  LeadType,
  MakeItSaleType,
} from '../types';
import http from '../http-common';
import { checkUnauthorizationStatus } from '../helper-functions';
import { messages } from '../../data/constants';

class CommentService {
  getAll = async (commentTypeForUrl: string, leadId: string) => {
    let commentTypeControllerName = commentTypeForUrl.replaceAll('/', '');
    try {
      const response = await http.get(
        `${commentTypeForUrl}${leadId}/comments?commentable_type=${commentTypeControllerName}`
      );
      return response;
    } catch (error) {
      alert(error);
    }
  };

  createComment = async (commentState: defaultCommentType) => {
    const commentTypeForUrl = commentState.commentable_type;
    commentState.commentable_type = commentState.commentable_type.replaceAll(
      '/',
      ''
    );
    commentState.commentable_id = +commentState.commentable_id;
    try {
      const response = await http.post(
        `${commentTypeForUrl}${commentState.commentable_id}/comments`,
        { data: commentState }
      );
      return response;
    } catch (error) {
      alert(error);
    }
  };
}

export default new CommentService();
