a project want html can be compile like this
```xml
<schemas>
  <description>some object dim here</description>
  <schema id="user">
    <string name="name"/>
    <string name="nail"/>
    <date name="birth">
  </schema>
  <schema id="users">
    <array>
      <object href="user">
    </array>
  </schema>
</schemas>
```
```html
<e:header>
  <e:import type="schema" uri="./schema.xml"/>
  <e:query-string var="query">
    <e:schema>
      <e:string name="id" required/>
    </e:schema>
  </e:query-string>
  <e:http var="data">
    <e:url value="/api/user?id=${name}"/>
    <e:schema ref="user" />
    <e:if-null-redirect uri="/error/404.html">
  </e:http-get>
  <e:http var="data">
    <e:url value="/api/user"/>
    <e:schema ref="users"/>
  </e:http>
</e:header>
<!doctype html>
<html>
  <head>
    <title><e:out value="${data[0].name}"/></title>
  </head>
  <body>
    <e:include uri="./header.html"/>
    <div>
      <e:each var="item" items="${data}">
        <div>
          <e:out value="${item.value}"/>
          <e:out value="${item.value}"/>
        </div>
      </e:each>
    </div>
  </body>
</html>
```
