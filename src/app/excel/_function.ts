// An internal module named SayHi with an exported function 'foo'
export const _functions = {

  psplit(s){
    var depth = 0, seg = 0, rv = [];
    s.replace(/[^(),]*([)]*)([(]*)(,)?/g,
              function (m, cls, opn, com, off, s) {
      depth += opn.length - cls.length;
      var newseg = off + m.length;
      if (!depth && com) {
        rv.push(s.substring(seg, newseg - 1));
        seg = newseg;
      }
      return m;
    });
    rv.push(s.substring(seg));
    return rv;
  } ,

  converttoExpression(n){



    n = n.split(/(\w+)(\W+)(\w+)/g).filter(elem => elem!=' ').filter(elem => elem!='')
    console.log(n);
    var expression = {};
    expression['left'] = n[0].replace(/\s/g,'')
    expression['right'] = n[2].replace(/\s/g,'')
    expression['logical'] = n[1].replace(/\s/g,'')

    return expression;
  },


  converttothenif(s){
    let condition_then_if = {};
    condition_then_if['value'] = s
    condition_then_if['choosen'] = 'then'
    return condition_then_if
  }


}











