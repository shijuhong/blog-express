const { exec } = require("../db/mysql");
const xss = require("xss");

const getList = (author, keyword) => {
  let sql = `select id, title, content, createTime, author from blogs where 1 = 1`;
  if (author) {
    sql += ` and author = '${author}'`;
  }
  if (keyword) {
    sql += ` and title like '%${keyword}%'`;
  }
  sql += ` order by createTime desc;`;

  return exec(sql);
};

const getDetail = (id) => {
  const sql = `select id, title, content, createTime, author from blogs where id = '${id}'`;
  return exec(sql).then((rows) => {
    // 返回的是数组，提取出数组中的第一项
    return rows[0];
  });
};

const newBlog = (blogData = {}) => {
  // blogData 是一个博客对象，包含 title、content、author 属性
  blogData = {
    ...blogData,
    createTime: Date.now(),
    id: 3, // 表示新建博客，插入到数据表里面的 id
  };
  const { title, content, author, createTime } = blogData;
  const sql = `
    insert into blogs (title, content, createTime, author) 
    values 
    ('${xss(title)}', '${xss(content)}', ${createTime}, '${author}');`;
  return exec(sql).then((insertData) => {
    // promise 返回插入的值对应的 id
    return {
      id: insertData.insertId,
    };
  });
};

/**
 * 更新指定 id 的博客内容
 * @param {number} id 要更新博客的对应 id
 * @param {object} blogData 博客对象，包含 title、content 属性
 * @returns promise, 包含成功或失败提示信息
 */
const updateBlog = (id, blogData = {}) => {
  const { title, content } = blogData;
  const sql = `
    update blogs set 
    title = '${xss(title)}', content = '${xss(content)}'
    where
    id = ${id}
  `;
  return exec(sql).then((updatedData) => {
    if (updatedData.affectedRows > 0) {
      return true;
    }
    return false;
  });
};

/**
 * 根据 id 删除博客
 * @param {number} id
 * @param {string} author
 * @returns boolean 删除成功
 */
const delBlog = (id, author) => {
  const sql = `
    delete from blogs 
    where id = '${id}' and author = '${author}';
  `;
  return exec(sql).then((delData) => {
    if (delData.affectedRows > 0) {
      return true;
    }
    return false;
  });
};

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
};
