function t(template, data){
 for (var obj in data)
   template = template.replace(new RegExp('{{'+obj+'}}','g'), data[obj])
 return template
}
